import { BarChart3, Inbox, Newspaper, ShieldAlert } from 'lucide-react';
import { useIntegrationStatus } from '../lib/useStatus';
import { Alert, Badge, Card, PageHeader, Spinner } from '../components/ui';

/**
 * Screens for features that depend on an outside service or a later phase.
 * They state plainly what is and is not connected; they never show sample numbers.
 */
function NotConnected({ icon: Icon, title, description, status, steps, children }) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      {status?.loading ? <Spinner label="Checking setup…" /> : null}
      {status?.error ? (
        <Alert tone="warning" className="mb-4" title="Could not check the setup">
          {status.error}
        </Alert>
      ) : null}
      <Card>
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <span className="rounded-xl bg-slate-100 p-3 text-slate-500">
            <Icon size={28} aria-hidden="true" />
          </span>
          <div className="space-y-3 text-sm text-slate-700">
            {children}
            {steps ? (
              <>
                <p className="font-semibold text-slate-900">To set it up, a developer or super administrator needs to:</p>
                <ol className="list-decimal space-y-1 pl-5">
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="text-slate-500">Details are in docs/DEVELOPER_GUIDE.md.</p>
              </>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Analytics() {
  const status = useIntegrationStatus();
  const connected = status.integrations?.analytics;
  return (
    <NotConnected
      icon={BarChart3}
      title="Analytics"
      description="Visits, popular pages, devices and where visitors come from."
      status={status}
      steps={
        connected
          ? null
          : [
              'Create a Google Analytics 4 property for pjoutlawlegal.com and add its Measurement ID as VITE_GA4_MEASUREMENT_ID.',
              'Decide on consent: add a cookie banner if visitors from regions that require consent are expected.',
              'Create a Google Cloud service account with read access to the property and add GA4_PROPERTY_ID, GA4_CLIENT_EMAIL and GA4_PRIVATE_KEY to Netlify.',
            ]
      }
    >
      <p>
        <Badge tone={connected ? 'info' : 'neutral'}>{connected ? 'Credentials found' : 'Not connected'}</Badge>
      </p>
      <p>
        {connected
          ? 'Analytics credentials are configured, but the traffic charts have not been built yet. They are the next planned step.'
          : 'No analytics service is connected, so there is no traffic data to show. This page will show real visitor numbers once Google Analytics is connected.'}
      </p>
    </NotConnected>
  );
}

export function ErrorMonitoring() {
  const status = useIntegrationStatus();
  const connected = status.integrations?.errorMonitoring;
  return (
    <NotConnected
      icon={ShieldAlert}
      title="Error Monitoring"
      description="Errors visitors run into on the website, how often, and whether they are fixed."
      status={status}
      steps={
        connected
          ? null
          : [
              'Create a Sentry project (the free tier is enough for this site).',
              'Add VITE_SENTRY_DSN to Netlify so the website reports errors (form contents and personal details are scrubbed before sending).',
              'Add SENTRY_AUTH_TOKEN, SENTRY_ORG and SENTRY_PROJECT so this page can list errors, and set up e-mail alerts in Sentry.',
            ]
      }
    >
      <p>
        <Badge tone={connected ? 'info' : 'neutral'}>{connected ? 'Credentials found' : 'Not connected'}</Badge>
      </p>
      <p>
        Error monitoring is <strong>not active</strong>. The website does not currently report errors anywhere, so problems are only noticed if someone tells you. Website Health runs the checks that are possible without an outside service.
      </p>
    </NotConnected>
  );
}

export function Articles() {
  return (
    <NotConnected icon={Newspaper} title="Blog / Articles" description="Write and publish articles.">
      <p>
        <Badge>Not built yet</Badge>
      </p>
      <p>
        The website has no public blog today (old /blog addresses redirect to the Home page). Article writing, categories, featured images and per-article SEO are planned next. When built, articles will stay hidden from the public menu until you approve showing them.
      </p>
    </NotConnected>
  );
}

export function Inquiries() {
  return (
    <NotConnected icon={Inbox} title="Contact Submissions" description="Messages sent through a website form.">
      <p>
        <Badge>No form on the website</Badge>
      </p>
      <p>
        The website does not have a contact form; visitors call, fax or e-mail the office directly, so there are no submissions to show. This was a deliberate decision. If a form is added later, inquiries will appear here, with access limited to the owner and super administrators.
      </p>
    </NotConnected>
  );
}
