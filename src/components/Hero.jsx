import { Suspense, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroScene from './three/HeroScene';
import { personalInfo, projects } from '../data/projects';
import { LiquidButton } from './ui/Buttons';
import styles from './Hero.module.css';

/* Floating particle data */
const PARTICLE_COUNT = 18;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  size:  Math.random() * 3 + 1.5,
  x:     Math.random() * 100,
  delay: Math.random() * 15,
  dur:   Math.random() * 12 + 10,
  color: i % 3 === 0 ? '#3438A5' : i % 3 === 1 ? '#5C72B5' : '#FFFFFF',
  opacity: Math.random() * 0.4 + 0.2,
}));

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 2.2 } },
};

const item = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [sceneOpacity, setSceneOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
      setSceneOpacity(1 - progress * 0.7);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* ── Three.js scene ── */}
      <Suspense fallback={null}>
        <HeroScene opacity={sceneOpacity} />
      </Suspense>

      {/* ── Ambient orbs ── */}
      <div className={styles.orbBlue}    aria-hidden="true" />
      <div className={styles.orbMagenta} aria-hidden="true" />
      <div className={styles.orbViolet}  aria-hidden="true" />

      {/* ── Floating particles ── */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              width:           p.size,
              height:          p.size,
              left:            `${p.x}%`,
              bottom:          '-10px',
              background:      p.color,
              animationDuration: `${p.dur}s`,
              animationDelay:    `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Floating stat cards (3D tilted glass) ── */}
      <motion.div
        className={styles.floatingCard}
        initial={{ opacity: 0, x: 40, rotateY: -8 }}
        animate={{ opacity: 1, x: 0,  rotateY: -8 }}
        transition={{ delay: 3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.floatingCardLabel}>Projects Built</p>
        <p className={styles.floatingCardValue}>{projects.length}+</p>
        <p className={styles.floatingCardSub}>AI / Full-Stack / 3D</p>
      </motion.div>

      <motion.div
        className={styles.floatingCard2}
        initial={{ opacity: 0, x: -40, rotateY: 8 }}
        animate={{ opacity: 1, x: 0,   rotateY: 8 }}
        transition={{ delay: 3.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.floatingCardLabel}>Status</p>
        <p className={styles.floatingCardValue} style={{ fontSize: '1.1rem' }}>Open to Work</p>
        <p className={styles.floatingCardSub}>Full-time & Internship</p>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div className={styles.badge} variants={item}>
          <span className={styles.badgeDot} />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1 className={styles.name} variants={item}>
          {personalInfo.name.split(' ')[0]}{' '}
          <span className={styles.nameAccent}>{personalInfo.name.split(' ')[1]}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p className={styles.tagline} variants={item}>
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div className={styles.ctaRow} variants={item}>
          <LiquidButton variant="primary" size="xl" onClick={scrollTo('projects')}>
            See My Work ↓
          </LiquidButton>
          <LiquidButton
            size="xl"
            className="text-[var(--color-text)] font-semibold"
            onClick={scrollTo('contact')}
          >
            Get In Touch
          </LiquidButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 4, duration: 1.2 }}
      >
        <div className={styles.scrollMouse}>
          <span className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>

      <div className={styles.gradientFade} />
    </section>
  );
}
