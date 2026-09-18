import { motion } from 'framer-motion';
import { personalInfo } from '../data/projects';
import styles from './About.module.css';

const fadeInUp = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const CHIPS = [
  { icon: '🎓', label: 'CS Student' },
  { icon: '🤖', label: 'AI Enthusiast' },
  { icon: '⚛️', label: 'React Developer' },
  { icon: '🎲', label: '3D Web / Three.js' },
  { icon: '🐍', label: 'Python / ML' },
  { icon: '🌙', label: 'Dark Mode Always' },
];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>

        {/* ── Text side ── */}
        <motion.div
          className={styles.textSide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.13 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>About Me</motion.span>

          <motion.h2 className={styles.title} variants={fadeInUp}>
            Crafting Digital<br />
            <span className="text-gradient">Experiences</span>
          </motion.h2>

          <motion.p className={styles.description} variants={fadeInUp}>
            {personalInfo.about}
          </motion.p>

          {/* Quick-info glass chips */}
          <motion.div className={styles.chips} variants={fadeInUp}>
            {CHIPS.map(c => (
              <span key={c.label} className={styles.chip}>
                {c.icon} {c.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Visual side — Glass portrait with orbits ── */}
        <motion.div
          className={styles.visualSide}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.orbitOuter}>
            <div className={styles.orbitLine} />
            <div className={styles.orbitLine} />

            {/* Portrait */}
            <div className={styles.glassPortrait}>
              <span className={styles.portraitBadge}>🚀 Open to Work</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.divider} />
    </section>
  );
}
