import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  return (
    <motion.div
      className={styles.preloader}
      exit={{
        y: '-100%',
        transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }
      }}
    >
      <motion.span
        className={styles.logo}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        GG
      </motion.span>

      <div className={styles.bar}>
        <motion.div
          className={styles.barFill}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  );
}
