import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import { isConfigured } from './lib/supabase';
import { can } from './lib/permissions';
import { Spinner, ToastProvider } from './components/ui';
import AdminLayout from './components/AdminLayout';
import { ForgotPassword, Login, MfaVerify, NoAccess, SetPassword, SetupRequired } from './pages/AuthPages';
import Overview from './pages/Overview';
import PagesList from './pages/PagesList';
import ContentEditor from './pages/ContentEditor';
import ContentChooser from './pages/ContentChooser';
import Services from './pages/Services';
import MediaLibrary from './pages/MediaLibrary';
import Users from './pages/Users';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Health from './pages/Health';
import Preview from './pages/Preview';
import { Analytics, Articles, ErrorMonitoring, Inquiries } from './pages/Integrations';
import './admin.css';

function Guard({ capability, children }) {
  const { role } = useAuth();
  if (capability && !can(role, capability)) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function AdminRoutes() {
  const auth = useAuth();
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, '');

  if (auth.status === 'loading') return <Spinner label="Opening the dashboard…" />;

  // Invitation and password-reset links land here with a temporary session.
  if (path === '/admin/set-password') return auth.session ? <SetPassword /> : <Navigate to="/admin/login" replace />;
  if (auth.recovery && auth.session) return <Navigate to="/admin/set-password" replace />;

  if (auth.status === 'signed_out') {
    return (
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/admin/login" replace state={{ from: location.pathname }} />} />
      </Routes>
    );
  }
  if (auth.status === 'needs_mfa') return <MfaVerify />;
  if (auth.status === 'no_access') return <NoAccess />;

  return (
    <Routes>
      <Route path="preview/:key" element={<Preview />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/:key" element={<ContentEditor />} />
        <Route path="editor" element={<ContentChooser />} />
        <Route path="services" element={<Services />} />
        <Route path="articles" element={<Articles />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="analytics" element={<Guard capability="viewAnalytics"><Analytics /></Guard>} />
        <Route path="health" element={<Guard capability="viewHealth"><Health /></Guard>} />
        <Route path="errors" element={<Guard capability="viewHealth"><ErrorMonitoring /></Guard>} />
        <Route path="seo" element={<Guard capability="editSeo"><ContentEditor areaKey="seo" /></Guard>} />
        <Route path="users" element={<Guard capability="manageUsers"><Users /></Guard>} />
        <Route path="activity" element={<Guard capability="viewActivity"><Activity /></Guard>} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/business" element={<ContentEditor areaKey="settings" />} />
        <Route path="pages/settings" element={<Navigate to="/admin/settings/business" replace />} />
        <Route path="login" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

export default function AdminApp() {
  if (!isConfigured) return <SetupRequired />;
  return (
    <div className="admin-root">
      <ToastProvider>
        <AuthProvider>
          <AdminRoutes />
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}
