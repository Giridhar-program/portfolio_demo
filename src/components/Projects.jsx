import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectCategories } from '../data/projects';
import styles from './Projects.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* Decorative SVG mockup for each project card */
function ProjectMockup({ color, title, category }) {
  const bars = [0.7, 0.5, 0.85, 0.4, 0.65];
  return (
    <svg
      viewBox="0 0 280 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background */}
      <rect width="280" height="160" fill="#0A0A0F" rx="8" />
      {/* Window bar */}
      <rect width="280" height="28" fill={color + '18'} rx="8" />
      <circle cx="16" cy="14" r="4.5" fill="#FF5F57" />
      <circle cx="30" cy="14" r="4.5" fill="#FFBC2E" />
      <circle cx="44" cy="14" r="4.5" fill="#28C840" />
      {/* Title text sim */}
      <rect x="12" y="42" width="90" height="7" rx="3.5" fill={color + 'CC'} />
      <rect x="12" y="56" width="140" height="5" rx="2.5" fill="#ffffff22" />
      <rect x="12" y="66" width="110" height="5" rx="2.5" fill="#ffffff15" />
      {/* Bar chart (for AI/ML and fullstack) */}
      {category !== 'creative' && bars.map((h, i) => (
        <rect
          key={i}
          x={12 + i * 28}
          y={140 - h * 50}
          width="16"
          height={h * 50}
          rx="3"
          fill={i % 2 === 0 ? color + 'CC' : color + '55'}
        />
      ))}
      {/* 3D grid lines for creative category */}
      {category === 'creative' && (
        <g opacity="0.6">
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1={12 + i * 65} y1="90" x2={12 + i * 65} y2="148" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1="12" y1={90 + i * 20} x2="267" y2={90 + i * 20} stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
          ))}
          <polygon points="139,95 180,130 139,148 98,130" fill="none" stroke={color} strokeWidth="1.2" />
          <polygon points="139,95 180,130 139,118 98,130" fill={color + '30'} />
        </g>
      )}
      {/* Glow dot */}
      <circle cx="257" cy="14" r="4" fill={color} opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.card}
      variants={fadeInUp}
      layout
      onClick={() => navigate(`/project/${project.id}`)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      role="link"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${project.id}`)}
    >
      {/* Rich mockup preview */}
      <div
        className={styles.cardImage}
        style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)` }}
      >
        <ProjectMockup color={project.color} title={project.title} category={project.category} />
        <div className={styles.cardOverlay}>
          <span className={styles.cardOverlayText}>View Project →</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        {/* Category badge */}
        <span
          className={styles.categoryBadge}
          style={{ color: project.color, borderColor: project.color + '40', background: project.color + '12' }}
        >
          {project.category === 'aiml' ? 'AI / ML' : project.category === 'fullstack' ? 'Full Stack' : '3D / Creative'}
        </span>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        <div className={styles.cardTags}>
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Links row */}
        <div className={styles.cardLinks}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              onClick={e => e.stopPropagation()}
              aria-label="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cardLink} ${styles.cardLinkLive}`}
              onClick={e => e.stopPropagation()}
              aria-label="Live Demo"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span className={styles.label} variants={fadeInUp}>Portfolio</motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Selected <span className="text-gradient">Work</span>
          </motion.h2>

          {/* Filter pills */}
          <motion.div className={styles.filterRow} variants={fadeInUp}>
            {projectCategories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterPill} ${activeCategory === cat.id ? styles.filterPillActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
