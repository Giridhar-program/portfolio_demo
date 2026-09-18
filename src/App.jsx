import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import FloatingMenu from './components/ui/FloatingMenu';
import Preloader from './components/layout/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent({ theme, toggleTheme }) {
  const [loading, setLoading] = useState(true);

  /* Initialize Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <FloatingMenu theme={theme} toggleTheme={toggleTheme} />
      <CustomCursor />
      <AnimatedRoutes />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'day' ? 'night' : 'day');
  };

  return (
    <HashRouter>
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </HashRouter>
  );
}
