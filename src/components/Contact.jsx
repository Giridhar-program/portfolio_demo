import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/projects';
import { LiquidButton } from './ui/Buttons';
import styles from './Contact.module.css';

const fadeInUp = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// ── To activate real email sending: ────────────────────────────────────────
// 1. Sign up at https://formspree.io (free tier)
// 2. Create a form → copy your endpoint ID
// 3. Replace the placeholder below with your real Formspree endpoint:
//    const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID';
const FORMSPREE = null; // set your Formspree URL here to enable

export default function Contact() {
  const [copied, setCopied]     = useState(false);
  const [form,   setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]     = useState('idle'); // idle | sending | sent | error

  /* ── Copy email ── */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = personalInfo.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Form submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    if (FORMSPREE) {
      /* Real Formspree submission */
      setStatus('sending');
      try {
        const res = await fetch(FORMSPREE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        setStatus(res.ok ? 'sent' : 'error');
      } catch {
        setStatus('error');
      }
    } else {
      /* Mailto fallback */
      const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
      const body    = encodeURIComponent(`Hi Giridhar,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
      setStatus('sent');
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.glow} />

      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        {/* Header */}
        <motion.span className={styles.label}    variants={fadeInUp}>Get In Touch</motion.span>
        <motion.h2   className={styles.title}    variants={fadeInUp}>
          Let's Build <span className="text-gradient">Something</span>
        </motion.h2>
        <motion.p    className={styles.subtitle} variants={fadeInUp}>
          Got a project in mind? I'd love to hear about it. Send a message and let's create something amazing together.
        </motion.p>

        {/* Two-column layout: form + info */}
        <motion.div className={styles.twoCol} variants={fadeInUp}>

          {/* Contact form */}
          <div className={styles.formCard}>
            {status === 'sent' ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.successIcon}>✓</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button className={styles.resetBtn} onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    className={styles.formInput}
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className={styles.formInput}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-msg">Message</label>
                  <textarea
                    id="contact-msg"
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    placeholder="Tell me about your project..."
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                {status === 'error' && (
                  <p className={styles.errorMsg}>Something went wrong. Try emailing directly.</p>
                )}
                <LiquidButton
                  variant="primary"
                  type="submit"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message ✉'}
                </LiquidButton>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className={styles.infoPanel}>
            <div className={styles.emailRow}>
              <span className={styles.infoTitle}>Direct Email</span>
              <span className={styles.email}>{personalInfo.email}</span>
              <button
                className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                onClick={handleCopy}
                aria-label="Copy email address"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            <div className={styles.divider} />

            <span className={styles.infoTitle}>Socials</span>
            <div className={styles.socials}>
              <motion.a
                href={personalInfo.socials.github}
                target="_blank" rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.a>
              <motion.a
                href={personalInfo.socials.linkedin}
                target="_blank" rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </motion.a>
            </div>

            <div className={styles.divider} />

            <p className={styles.responseTime}>
              ⚡ Typically responds within <strong>24 hours</strong>
            </p>
          </div>
        </motion.div>

        <div className={styles.footer}>
          <p>© {new Date().getFullYear()} {personalInfo.name}. Built with React & Three.js</p>
        </div>
      </motion.div>
    </section>
  );
}
