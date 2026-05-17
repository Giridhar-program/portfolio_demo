import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroScene from './three/HeroScene';
import { personalInfo } from '../data/projects';
import styles from './Hero.module.css';

export default function Hero() {
  const [sceneOpacity, setSceneOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
      setSceneOpacity(1 - progress * 0.7);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 2.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className={styles.hero}>
      <Suspense fallback={null}>
        <HeroScene opacity={sceneOpacity} />
      </Suspense>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.name} variants={itemVariants}>
          <span className="text-gradient">{personalInfo.name}</span>
        </motion.h1>

        <motion.p className={styles.tagline} variants={itemVariants}>
          {personalInfo.tagline}
        </motion.p>

        <motion.button
          className={styles.cta}
          variants={itemVariants}
          onClick={scrollToProjects}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          See My Work ↓
        </motion.button>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>

      <div className={styles.gradientFade} />
    </section>
  );
}
