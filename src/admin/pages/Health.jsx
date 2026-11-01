import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CircleDashed, RefreshCw, TriangleAlert, XCircle } from 'lucide-react';
import { defaultContent } from '../../content';
import { listEntries } from '../lib/content';
import { checkContentLinks } from '../lib/linkCheck';
import { supabase } from '../lib/supabase';
import { editorPath } from '../lib/schemas';
import { useIntegrationStatus } from '../lib/useStatus';
import { Badge, Button, Card, PageHeader, formatDateTime } from '../components/ui';

const STATES = {
  ok: { icon: CheckCircle2, className: 'text-emerald-600', label: 'OK' },
  warn: { icon: TriangleAlert, className: 'text-amber-600', label: 'Check' },
  fail: { icon: XCircle, className: 'text-red-600', label: 'Problem' },
  off: { icon: CircleDashed, className: 'text-slate-400', label: 'Not set up' },
};

async function timed(fn) {
  const start = performance.now();
  const result = await fn();
  return { result, ms: Math.round(performance.now() - start) };
}

async function checkUrl(path) {
  try {
    const { result, ms } = await timed(() => fetch(path, { cache: 'no-store' }));
    return { ok: result.ok, status: result.status, ms, type: result.headers.get('content-type') ?? '' };
  } catch {
    return { ok: false, status: 0, ms: null, type: '' };
  }
}

async function runChecks() {
  const results = [];

  const site = await checkUrl('/');
  results.push({
    label: 'Website responds',
    state: site.ok ? (site.ms > 3000 ? 'warn' : 'ok') : 'fail',
    detail: site.ok ? `Home page answered in ${site.ms} ms (from this browser).` : `The home page did not load (status ${site.status || 'no response'}).`,
  });

  const payments = await checkUrl('/api/health');
  results.push({
    label: 'Online payment service',
    state: payments.ok && payments.type.includes('json') ? 'ok' : 'warn',
    detail: payments.ok && payments.type.includes('json') ? `Payment server answered in ${payments.ms} ms. (This does not test PayPal itself.)` : 'The payment server did not answer. It only runs on Netlify, so this is expected in local development.',
  });

  const [robots, sitemap] = await Promise.all([checkUrl('/robots.txt'), checkUrl('/sitemap.xml')]);
  const seoFilesOk = robots.ok && robots.type.includes('text/plain') && sitemap.ok && sitemap.type.includes('xml');
  results.push({
    label: 'Search engine files',
    state: seoFilesOk ? 'ok' : 'warn',
    detail: seoFilesOk ? 'robots.txt and sitemap.xml are being served.' : 'robots.txt or sitemap.xml is missing. They are created when the site is built and deployed.',
  });

  let rows = {};
  try {
    const { result, ms } = await timed(() => listEntries());
    rows = result;
    results.push({ label: 'Content database', state: ms > 3000 ? 'warn' : 'ok', detail: `Connected in ${ms} ms.` });
  } catch (error) {
    results.push({ label: 'Content database', state: 'fail', detail: `Could not reach the database: ${error.message}` });
  }

  const waiting = Object.values(rows).filter((row) => JSON.stringify(row.draft) !== JSON.stringify(row.published));
  results.push({
    label: 'Unpublished changes',
    state: waiting.length ? 'warn' : 'ok',
    detail: waiting.length ? `${waiting.map((row) => row.title).join(', ')} ${waiting.length === 1 ? 'has' : 'have'} saved changes visitors cannot see yet.` : 'Everything saved has been published.',
  });

  const live = Object.fromEntries(Object.entries(defaultContent).map(([key, value]) => [key, rows[key]?.published ?? value]));
  let mediaUrls = new Set();
  try {
    const { data } = await supabase.from('media').select('public_url');
    mediaUrls = new Set((data ?? []).map((row) => row.public_url));
  } catch {
    // Without the media list, deleted-image detection is skipped.
  }
  return { results, linkIssues: checkContentLinks(live, mediaUrls) };
}

function Row({ check }) {
  const { icon: Icon, className, label } = STATES[check.state];
  return (
    <li className="flex gap-3 px-5 py-3">
      <Icon size={20} className={`mt-0.5 shrink-0 ${className}`} aria-hidden="true" />
      <div className="text-sm">
        <p className="font-semibold text-slate-900">
          {check.label} <span className="sr-only">: {label}</span>
        </p>
        <p className="text-slate-600">{check.detail}</p>
      </div>
    </li>
  );
}

export default function Health() {
  const integrations = useIntegrationStatus();
  const [checks, setChecks] = useState(null);
  const [links, setLinks] = useState(null);
  const [checkedAt, setCheckedAt] = useState(null);
  const [running, setRunning] = useState(true);

  const apply = useCallback(({ results, linkIssues }) => {
    setLinks(linkIssues);
    setChecks(results);
    setCheckedAt(new Date());
    setRunning(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    runChecks().then((outcome) => !cancelled && apply(outcome));
    return () => {
      cancelled = true;
    };
  }, [apply]);

  const run = () => {
    setRunning(true);
    runChecks().then(apply);
  };



  const services = integrations.integrations;
  const external = [
    { label: 'Automatic publishing', state: services?.publishing ? 'ok' : 'off', detail: services?.publishing ? 'Publishing triggers a website update.' : 'Published changes go live only when the site is next deployed.' },
    { label: 'Uptime monitoring and alerts', state: services?.uptime ? 'ok' : 'off', detail: 'Checks the site every few minutes from outside and e-mails when it is down. A dashboard cannot monitor a site that is offline, so this needs an outside service.' },
    { label: 'SSL certificate expiry', state: 'off', detail: 'Netlify renews the certificate automatically. Expiry alerts come with uptime monitoring.' },
    { label: 'Error monitoring (Sentry)', state: services?.errorMonitoring ? 'ok' : 'off', detail: 'Records errors visitors hit in their browsers.' },
  ];

  const errors = links?.filter((issue) => issue.severity === 'error') ?? [];
  const warnings = links?.filter((issue) => issue.severity === 'warning') ?? [];

  return (
    <div>
      <PageHeader
        title="Website Health"
        description="Live checks run from your browser when you open this page."
        actions={
          <Button icon={RefreshCw} onClick={run} busy={running}>
            Run checks again
          </Button>
        }
      >
        {checkedAt ? <p className="mt-2 text-sm text-slate-500">Last checked {formatDateTime(checkedAt)}</p> : null}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Checks" padded={false}>
          <ul className="divide-y divide-slate-100">{checks ? checks.map((check) => <Row key={check.label} check={check} />) : <li className="px-5 py-4 text-sm text-slate-500">Running…</li>}</ul>
        </Card>
        <Card title="Outside monitoring" description="Services that watch the site around the clock." padded={false}>
          <ul className="divide-y divide-slate-100">
            {external.map((check) => (
              <Row key={check.label} check={check} />
            ))}
          </ul>
        </Card>
      </div>

      <Card
        className="mt-6"
        title="Links and images on the live site"
        description="Every link and image in the published content was checked."
        actions={links ? <Badge tone={errors.length ? 'danger' : warnings.length ? 'warning' : 'success'}>{errors.length} problems · {warnings.length} to review</Badge> : null}
        padded={false}
      >
        {links && !links.length ? <p className="px-5 py-4 text-sm text-emerald-700">No broken links or missing images found.</p> : null}
        <ul className="divide-y divide-slate-100">
          {[...errors, ...warnings].map((issue) => (
            <li key={`${issue.areaKey}-${issue.path}`} className="flex flex-wrap items-start justify-between gap-3 px-5 py-3 text-sm">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {issue.problem} <Badge tone={issue.severity === 'error' ? 'danger' : 'warning'}>{issue.severity === 'error' ? 'Broken' : 'Review'}</Badge>
                </p>
                <p className="truncate text-slate-500">
                  {issue.area} · {issue.value.length > 80 ? `${issue.value.slice(0, 80)}…` : issue.value}
                </p>
              </div>
              <Link to={editorPath(issue.areaKey)} className="font-semibold text-[#1E3A5F] hover:underline">
                Fix
              </Link>
            </li>
          ))}
        </ul>
        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">Links to other websites cannot be checked from the browser; that needs uptime monitoring.</p>
      </Card>
    </div>
  );
}
