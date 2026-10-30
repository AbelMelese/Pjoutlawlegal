import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, FileText, Globe, HeartPulse, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { recentActivity, STATUS_LABELS } from '../lib/content';
import { can } from '../lib/permissions';
import { supabase } from '../lib/supabase';
import { useEntries } from '../lib/useEntries';
import { editorPath } from '../lib/schemas';
import { useIntegrationStatus } from '../lib/useStatus';
import ActivityList from '../components/ActivityList';
import { Alert, Badge, Card, PageHeader, Spinner } from '../components/ui';

function StatTile({ icon: Icon, label, value, tone = 'neutral', to, children }) {
  const tones = { neutral: 'text-slate-900', success: 'text-emerald-700', warning: 'text-amber-700', danger: 'text-red-700' };
  const body = (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#C5A03A]">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <Icon size={16} aria-hidden="true" /> {label}
      </div>
      <p className={`mt-2 text-2xl font-bold ${tones[tone]}`}>{value}</p>
      {children ? <div className="mt-1 text-sm text-slate-500">{children}</div> : null}
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

export default function Overview() {
  const { profile, role } = useAuth();
  const { loading, areas } = useEntries();
  const integrations = useIntegrationStatus();
  const [activity, setActivity] = useState(null);
  const [site, setSite] = useState(null);
  const [mfaEnrolled, setMfaEnrolled] = useState(null);

  useEffect(() => {
    if (can(role, 'viewActivity')) recentActivity({ limit: 8 }).then(setActivity).catch(() => setActivity([]));
    fetch('/', { cache: 'no-store' })
      .then((response) => setSite(response.ok ? 'up' : 'down'))
      .catch(() => setSite('down'));
    supabase.auth.mfa.listFactors().then(({ data }) => setMfaEnrolled(Boolean(data?.totp?.some((f) => f.status === 'verified'))));
  }, [role]);

  const waiting = areas.filter((entry) => entry.status === 'changes' || entry.status === 'draft');
  const services = integrations.integrations;
  const firstName = (profile?.full_name || '').split(' ')[0];

  return (
    <div>
      <PageHeader title={firstName ? `Welcome, ${firstName}` : 'Welcome'} description="An overview of the website and anything that needs your attention." />

      {mfaEnrolled === false ? (
        <Alert tone={role === 'super_admin' ? 'danger' : 'warning'} className="mb-6" title="Turn on two-step verification">
          {role === 'super_admin' ? 'Super administrators must use two-step verification before they can change anything. ' : 'It keeps the website safe even if your password is stolen. '}
          <Link to="/admin/settings" className="font-semibold underline">
            Set it up in Settings
          </Link>
          .
        </Alert>
      ) : null}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={Globe} label="Website" value={site === null ? 'Checking…' : site === 'up' ? 'Online' : 'Not responding'} tone={site === 'down' ? 'danger' : site === 'up' ? 'success' : 'neutral'}>
          Checked from this browser just now
        </StatTile>
        <StatTile icon={FileText} label="Waiting to publish" value={loading ? '…' : waiting.length} tone={waiting.length ? 'warning' : 'success'} to="/admin/pages">
          {waiting.length ? 'Sections with saved, unpublished changes' : 'Everything is published'}
        </StatTile>
        <StatTile icon={BarChart3} label="Traffic" value={services?.analytics ? 'Connected' : 'Not connected'} to={can(role, 'viewAnalytics') ? '/admin/analytics' : undefined}>
          {services?.analytics ? 'See Analytics' : 'Connect Google Analytics to see visits'}
        </StatTile>
        <StatTile icon={ShieldAlert} label="Error monitoring" value={services?.errorMonitoring ? 'Connected' : 'Not connected'} to={can(role, 'viewHealth') ? '/admin/errors' : undefined}>
          {services?.errorMonitoring ? 'See Error Monitoring' : 'Errors are not being recorded yet'}
        </StatTile>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card
          title="Content"
          actions={
            <Link to="/admin/pages" className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A5F] hover:underline">
              All pages <ArrowRight size={14} aria-hidden="true" />
            </Link>
          }
          padded={false}
        >
          {loading ? <Spinner /> : null}
          <ul className="divide-y divide-slate-100">
            {areas.map(({ area, status }) => (
              <li key={area.key}>
                <Link to={editorPath(area.key)} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-50">
                  <span className="font-medium text-slate-800">{area.title}</span>
                  <Badge tone={STATUS_LABELS[status].tone}>{STATUS_LABELS[status].label}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          {can(role, 'viewActivity') ? (
            <Card
              title="Recent activity"
              actions={
                <Link to="/admin/activity" className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A5F] hover:underline">
                  Full history <ArrowRight size={14} aria-hidden="true" />
                </Link>
              }
              padded={false}
            >
              {activity === null ? <Spinner /> : activity.length ? <ActivityList items={activity} /> : <p className="px-5 py-4 text-sm text-slate-500">No changes have been made in the dashboard yet.</p>}
            </Card>
          ) : null}

          {can(role, 'viewHealth') ? (
            <Card title="Monitoring" padded={false}>
              <ul className="divide-y divide-slate-100 text-sm">
                {[
                  ['Automatic publishing', services?.publishing],
                  ['Uptime alerts', services?.uptime],
                  ['Error reporting', services?.errorReporting],
                ].map(([label, on]) => (
                  <li key={label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-slate-700">{label}</span>
                    {integrations.loading ? <span className="text-slate-400">…</span> : integrations.error ? <Badge tone="warning">Unknown</Badge> : on ? <Badge tone="success"><ShieldCheck size={12} /> On</Badge> : <Badge>Not set up</Badge>}
                  </li>
                ))}
              </ul>
              <Link to="/admin/health" className="flex items-center gap-2 border-t border-slate-100 px-5 py-3 text-sm font-semibold text-[#1E3A5F] hover:bg-slate-50">
                <HeartPulse size={16} aria-hidden="true" /> Run website health checks
              </Link>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
