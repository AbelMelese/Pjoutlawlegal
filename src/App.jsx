import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MediationServices from './pages/MediationServices';
import DivorceFamily from './pages/DivorceFamily';
import Coaching from './pages/Coaching';
import BusinessServices from './pages/BusinessServices';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ScrollToTop from './components/ScrollToTop';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/mediation-services" element={<MediationServices />} />
        <Route path="/divorce-family-law" element={<DivorceFamily />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/business-services" element={<BusinessServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
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


