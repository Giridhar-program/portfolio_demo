import { motion } from 'framer-motion';
import { certifications } from '../data/projects';
import styles from './Achievements.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function AchievementCard({ cert, index }) {
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${cert.isAchievement ? styles.cardAchievement : ''}`}
      variants={scaleIn}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.25 } }}
      style={{ '--card-color': cert.color }}
    >
      {/* Ambient glow */}
      <div className={styles.cardGlow} style={{ background: cert.color + '20' }} />

      {/* Top row */}
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>{cert.icon}</span>
        {cert.isAchievement && (
          <span className={styles.achievementBadge}>
            🏆 Achievement
          </span>
        )}
        <span className={styles.cardYear}>{cert.year}</span>
      </div>

      {/* Content */}
      <h3 className={styles.cardTitle}>{cert.title}</h3>
      <p className={styles.cardIssuer}>{cert.issuer}</p>
      <p className={styles.cardDesc}>{cert.description}</p>

      {/* Accent bar */}
      <div className={styles.accentBar} style={{ background: cert.color }} />
    </motion.a>
  );
}

export default function Achievements() {
  const achievements = certifications.filter(c => c.isAchievement);
  const certs = certifications.filter(c => !c.isAchievement);

  return (
    <section id="achievements" className={styles.achievements}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>
            Recognition & Learning
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Certifications &{' '}
            <span className="text-gradient">Achievements</span>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={fadeInUp}>
            A curated collection of courses completed, skills validated, and milestones earned.
          </motion.p>
        </motion.div>

        {/* Achievements row (if any) */}
        {achievements.length > 0 && (
          <motion.div
            className={styles.achievementsRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ staggerChildren: 0.12 }}
          >
            {achievements.map((cert, i) => (
              <AchievementCard key={cert.id} cert={cert} index={i} />
            ))}
          </motion.div>
        )}

        {/* Certs bento grid */}
        <motion.div
          className={styles.bentoGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {certs.map((cert, i) => (
            <AchievementCard key={cert.id} cert={cert} index={i} />
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className={styles.statsStrip}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          {[
            { value: '4+', label: 'Projects Built' },
            { value: '5+', label: 'Certifications' },
            { value: '1st', label: 'Hackathon Win' },
            { value: '∞', label: 'Curiosity' },
          ].map(stat => (
            <motion.div key={stat.label} className={styles.statItem} variants={fadeInUp}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
