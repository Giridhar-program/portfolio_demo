import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import styles from './ProjectDetail.module.css';
import { useEffect } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const SECTION_DOTS = {
  problem: '#FF006E',
  approach: '#00BFFF',
  result: '#4ADE80',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <motion.div
        className={styles.notFound}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className={styles.notFoundTitle}>Project not found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          The project you're looking for doesn't exist.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.detail}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} variants={fadeInUp}>
          <Link to="/" className={styles.backLink}>
            ← Back to all projects
          </Link>

          <h1 className={styles.title}>
            <span className="text-gradient">{project.title}</span>
          </h1>

          <p className={styles.desc}>{project.description}</p>

          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className={styles.links}>
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                GitHub →
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live Demo →
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.heroImage}
          variants={fadeInUp}
          style={{
            background: `linear-gradient(135deg, ${project.color}12, ${project.color}06)`,
            border: `1px solid ${project.color}15`,
          }}
        >
          {project.title}
        </motion.div>

        {project.details && (
          <>
            <motion.div className={styles.section} variants={fadeInUp}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionDot} style={{ background: SECTION_DOTS.problem }} />
                The Problem
              </h2>
              <p className={styles.sectionContent}>{project.details.problem}</p>
            </motion.div>

            <motion.div className={styles.section} variants={fadeInUp}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionDot} style={{ background: SECTION_DOTS.approach }} />
                The Approach
              </h2>
              <p className={styles.sectionContent}>{project.details.approach}</p>
            </motion.div>

            <motion.div className={styles.section} variants={fadeInUp}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionDot} style={{ background: SECTION_DOTS.result }} />
                The Result
              </h2>
              <p className={styles.sectionContent}>{project.details.result}</p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
