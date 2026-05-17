import { Suspense } from 'react';
import { motion } from 'framer-motion';
import SkillsConstellation from './three/SkillsConstellation';
import { skills } from '../data/projects';
import styles from './Skills.module.css';

const CATEGORY_CONFIG = {
  frontend: { label: 'Frontend', color: '#00BFFF' },
  aiml: { label: 'AI / Machine Learning', color: '#FF006E' },
  tools: { label: 'Tools & Workflow', color: '#8B5CF6' },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>
            Tech Stack
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Skills & <span className="text-gradient">Tools</span>
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

        {/* Mobile: Fallback Grid */}
        <div className={styles.fallbackGrid}>
          {Object.entries(skills).map(([category, skillList]) => (
            <motion.div
              key={category}
              className={styles.categorySection}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ staggerChildren: 0.05 }}
            >
              <div className={styles.categoryTitle}>
                <span
                  className={styles.categoryDot}
                  style={{ background: CATEGORY_CONFIG[category].color }}
                />
                {CATEGORY_CONFIG[category].label}
              </div>
              <div className={styles.skillCards}>
                {skillList.map((skill, i) => (
                  <motion.div key={i} className={styles.skillCard} variants={fadeInUp}>
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
