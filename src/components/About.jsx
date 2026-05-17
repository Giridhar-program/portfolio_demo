import { motion } from 'framer-motion';
import { personalInfo } from '../data/projects';
import styles from './About.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.textSide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>
            About Me
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Crafting Digital
            <br />
            <span className="text-gradient">Experiences</span>
          </motion.h2>
          <motion.p className={styles.description} variants={fadeInUp}>
            {personalInfo.about}
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.visualSide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scaleIn}
        >
          <motion.div
            className={styles.blob}
            animate={{
              borderRadius: [
                '50% 40% 60% 45% / 55% 50% 45% 50%',
                '45% 55% 50% 50% / 50% 45% 55% 48%',
                '55% 45% 45% 55% / 48% 52% 48% 52%',
                '50% 40% 60% 45% / 55% 50% 45% 50%',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className={styles.blobInner} />
            <motion.div
              className={styles.blobRing}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className={styles.blobRingOuter}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.divider} />
    </section>
  );
}
