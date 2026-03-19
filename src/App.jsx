import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BusinessServices from './pages/BusinessServices';
import Coaching from './pages/Coaching';
import Contact from './pages/Contact';
import DivorceFamily from './pages/DivorceFamily';
import Home from './pages/Home';
import MediationServices from './pages/MediationServices';
import MeetAttorneys from './pages/MeetAttorneys';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/mediation-services" element={<MediationServices />} />
        <Route path="/divorce-family-law" element={<DivorceFamily />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/business-services" element={<BusinessServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/meet-attorneys" element={<MeetAttorneys />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="site-frame min-h-screen flex flex-col">
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
