import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MediationServices from './pages/MediationServices';
import Coaching from './pages/Coaching';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import ScrollReveal from './components/ScrollReveal';
import LegalServices from './pages/LegalServices';
import AboutPhyllis from './pages/AboutPhyllis';
import Testimonials from './pages/Testimonials';
import OnlinePayment from './pages/OnlinePayment';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/mediation-services" element={<MediationServices />} />
        <Route path="/legal-services" element={<LegalServices />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/about-phyllis-j-outlaw" element={<AboutPhyllis />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/online-payment" element={<OnlinePayment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/divorce-family-law" element={<Navigate to="/legal-services" replace />} />
        <Route path="/business-services" element={<Navigate to="/legal-services" replace />} />
        <Route path="/blog" element={<Navigate to="/" replace />} />
        <Route path="/blog/:id" element={<Navigate to="/" replace />} />
        <Route path="/meet-attorneys" element={<Navigate to="/about-phyllis-j-outlaw" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollReveal />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


