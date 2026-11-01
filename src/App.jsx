import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MediationServices from './pages/MediationServices';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import ScrollReveal from './components/ScrollReveal';
import RouteSeo from './components/RouteSeo';
import PracticeAreas from './pages/PracticeAreas';
import AboutPhyllis from './pages/AboutPhyllis';
import OnlinePayment from './pages/OnlinePayment';
import LegalPage from './pages/LegalPage';

// The admin is a separate bundle: public visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp'));

const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/mediation-services', element: <MediationServices /> },
  { path: '/about-phyllis-j-outlaw', element: <AboutPhyllis /> },
  { path: '/online-payment', element: <OnlinePayment /> },
  { path: '/practice-areas', element: <PracticeAreas /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy-policy', element: <LegalPage contentKey="privacy" /> },
  { path: '/terms-of-use', element: <LegalPage contentKey="terms" /> },
];

const legacyRedirects = [
  ['/legal-services', '/practice-areas'],
  ['/divorce-family-law', '/practice-areas'],
  ['/business-services', '/practice-areas'],
  ['/blog', '/'],
  ['/blog/:id', '/'],
  ['/meet-attorneys', '/about-phyllis-j-outlaw'],
];

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-enter">
      <Routes location={location}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {legacyRedirects.map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
      </Routes>
    </div>
  );
};

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const PublicSite = () => (
  <>
    <ScrollToTop />
    <ScrollReveal />
    <RouteSeo />
    <PublicLayout>
      <AnimatedRoutes />
    </PublicLayout>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="admin-loading">Loading…</div>}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </Router>
  );
}

export default App;
