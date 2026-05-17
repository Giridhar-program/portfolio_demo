import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import styles from './DynamicIsland.module.css';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isProjectPage = location.pathname.startsWith('/project/');

  /* Expand on scroll past hero */
  useEffect(() => {
    if (isProjectPage) {
      setIsExpanded(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsExpanded(scrollY > window.innerHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectPage]);

  /* Track active section */
  useEffect(() => {
    if (isProjectPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isProjectPage, location]);

  const scrollToSection = useCallback((id) => {
    if (isProjectPage) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, [isProjectPage, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <LayoutGroup>
      <motion.nav
        className={styles.island}
        layout
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 2,
        }}
      >
        <motion.div className={styles.islandInner} layout>
          <motion.span className={styles.logo} layout="position">
            GG
          </motion.span>

          <AnimatePresence mode="wait">
            {isProjectPage ? (
              <motion.div
                key="back"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span className={styles.separator} />
                <button className={styles.backBtn} onClick={handleBack}>
                  ← Back
                </button>
              </motion.div>
            ) : isExpanded ? (
              <motion.div
                key="nav"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}
              >
                <span className={styles.separator} />
                <div className={styles.navLinks}>
                  {NAV_ITEMS.map(item => (
                    <button
                      key={item.id}
                      className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {activeSection === item.id && (
                        <motion.span
                          className={styles.activeIndicator}
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Mobile toggle */}
          <button
            className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                className={styles.mobileMenuLink}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
