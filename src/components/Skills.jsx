import { Suspense } from 'react';
import { motion } from 'framer-motion';
import SkillsConstellation from './three/SkillsConstellation';
import { skills } from '../data/projects';
import styles from './Skills.module.css';

const CATEGORY_CONFIG = {
  frontend: { label: 'Frontend',             color: '#3942c6', glyph: '⚛️' },
  aiml:     { label: 'AI / Machine Learning', color: '#5978c3', glyph: '🧠' },
  tools:    { label: 'Tools & Workflow',      color: '#8B5CF6', glyph: '🛠️' },
};

const fadeInUp = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>Tech Stack</motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Skills &amp; <span className="text-gradient">Tools</span>
          </motion.h2>
        </motion.div>

        {/* Desktop: 3D Constellation */}
        <motion.div
          className={styles.constellationWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Suspense fallback={<div style={{ height: '500px' }} />}>
            <SkillsConstellation />
          </Suspense>
        </motion.div>

        {/* Legend */}
        <div className={styles.legend}>
          {Object.entries(CATEGORY_CONFIG).map(([key, { label, color }]) => (
            <div key={key} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Glass skill grid — visible always (mobile primary, desktop supplemental) */}
        <motion.div
          className={styles.skillGrid}
          style={{ marginTop: 'var(--space-10)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {Object.entries(skills).map(([category, skillList]) => {
            const cfg = CATEGORY_CONFIG[category];
            return (
              <motion.div key={category} className={styles.categoryCard} variants={cardVariants}>
                <div className={styles.categoryHeader}>
                  <span
                    className={styles.categoryDot}
                    style={{ background: cfg.color, color: cfg.color }}
                  />
                  <span className={styles.categoryTitle}>{cfg.label}</span>
                </div>
                <div className={styles.skillList}>
                  {skillList.map((skill, i) => (
                    <motion.div
                      key={i}
                      className={styles.skillItem}
                      whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    >
                      <span className={styles.skillEmoji}>{skill.icon}</span>
                      <span className={styles.skillName}>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
