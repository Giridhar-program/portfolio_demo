import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, skills, projects } from '../data/projects';
import styles from './Terminal.module.css';

const PROMPT = 'visitor@giridhar:~$';

const HELP_TEXT = `
Available commands:
  about       — Who is Giridhar?
  skills      — Tech stack overview
  projects    — List all projects
  contact     — How to reach me
  social      — Social media links
  clear       — Clear the terminal
  help        — Show this menu
`.trim();

const RESPONSES = {
  about: () => `
┌─ About Giridhar Girish ─────────────────────────────┐
│                                                      │
│  Role     : AI Enthusiast & Full-Stack Developer     │
│  Email    : ${personalInfo.email}     │
│                                                      │
│  "${personalInfo.about.slice(0, 120)}..."             │
│                                                      │
└──────────────────────────────────────────────────────┘
`.trim(),

  skills: () => {
    const fe  = skills.frontend.map(s => s.name).join(', ');
    const ai  = skills.aiml.map(s => s.name).join(', ');
    const tl  = skills.tools.map(s => s.name).join(', ');
    return `
┌─ Tech Stack ────────────────────────────────────────┐
│                                                      │
│  Frontend  : ${fe}   │
│  AI / ML   : ${ai}         │
│  Tools     : ${tl}   │
│                                                      │
└──────────────────────────────────────────────────────┘
`.trim();
  },

  projects: () => {
    const lines = projects.map(
      p => `  ▸ ${p.title.padEnd(20)} [${p.category.toUpperCase()}]  — ${p.description}`
    ).join('\n');
    return `Projects (${projects.length} total):\n${lines}`;
  },

  contact: () => `
Reach out — I'd love to connect!

  Email   : ${personalInfo.email}
  GitHub  : ${personalInfo.socials.github}
  LinkedIn: ${personalInfo.socials.linkedin}

  Or just scroll down to the Contact section below ↓
`.trim(),

  social: () => `
Social Links:
  GitHub   → ${personalInfo.socials.github}
  LinkedIn → ${personalInfo.socials.linkedin}
  Twitter  → ${personalInfo.socials.twitter === '#' ? '(coming soon)' : personalInfo.socials.twitter}
`.trim(),

  clear: () => null, // handled specially

  help: () => HELP_TEXT,

  whoami: () => 'giridhar — builder of intelligent interfaces',
  pwd: () => '/home/giridhar/portfolio',
  ls: () => 'about/   projects/   skills/   contact/',
  date: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  echo: (args) => args.join(' '),
};

const WELCOME = `
Welcome to Giridhar's Interactive Terminal v1.0
Type 'help' to see available commands.
─────────────────────────────────────────────────
`.trim();

export default function Terminal() {
  const [lines, setLines] = useState([{ type: 'output', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const run = useCallback((raw) => {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);

    // Add the command line to history
    setLines(prev => [...prev, { type: 'command', text: raw.trim() }]);
    setHistory(prev => [raw.trim(), ...prev]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setLines([{ type: 'output', text: WELCOME }]);
      return;
    }

    const handler = RESPONSES[cmd];
    let output;
    if (handler) {
      output = handler(args);
    } else {
      output = `bash: ${cmd}: command not found\nType 'help' for available commands.`;
    }

    if (output !== null) {
      setLines(prev => [...prev, { type: 'output', text: output }]);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIdx);
      setInput(history[newIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx] ?? '');
    }
  };

  return (
    <section id="terminal" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Easter Egg</span>
          <h2 className={styles.title}>
            Interactive <span className="text-gradient">Terminal</span>
          </h2>
          <p className={styles.subtitle}>
            Poke around. Type <code className={styles.code}>help</code> to get started.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          className={styles.window}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
        >
          {/* Title bar */}
          <div className={styles.titleBar}>
            <div className={styles.dots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.windowTitle}>bash — giridhar@portfolio</span>
            <div style={{ width: 48 }} />
          </div>

          {/* Output */}
          <div className={styles.body}>
            {lines.map((line, i) => (
              <div key={i} className={line.type === 'command' ? styles.commandLine : styles.outputLine}>
                {line.type === 'command' && (
                  <span className={styles.promptText}>{PROMPT} </span>
                )}
                <span style={{ whiteSpace: 'pre-wrap' }}>{line.text}</span>
              </div>
            ))}

            {/* Input row */}
            <div className={styles.inputRow}>
              <span className={styles.promptText}>{PROMPT}&nbsp;</span>
              <input
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
              <span className={styles.cursor} />
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Quick command chips */}
          <div className={styles.chips}>
            {['about', 'skills', 'projects', 'contact'].map(cmd => (
              <button
                key={cmd}
                className={styles.chip}
                onClick={e => { e.stopPropagation(); run(cmd); }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
