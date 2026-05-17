import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

function ProjectCard({ project, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.card}
      variants={fadeInUp}
      onClick={() => navigate(`/project/${project.id}`)}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      role="link"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${project.id}`)}
    >
      <div
        className={styles.cardImage}
        style={{
          background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
        }}
      >
        <span className={styles.cardPlaceholder}>
          {project.title.split(' ').map(w => w[0]).join('')}
        </span>
        <div className={styles.cardOverlay}>
          <span className={styles.cardOverlayText}>
            View Project →
          </span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>
            Portfolio
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Selected <span className="text-gradient">Work</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
