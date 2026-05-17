import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    /* Detect touch devices */
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouchScreen);
    if (hasTouchScreen) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    /* Track hoverable elements */
    const handleOver = (e) => {
      if (e.target.closest('a, button, [role="link"], [data-hover]')) {
        setIsHovering(true);
      }
    };
    const handleOut = (e) => {
      if (e.target.closest('a, button, [role="link"], [data-hover]')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? 40 : 12,
        height: isHovering ? 40 : 12,
        borderRadius: '50%',
        background: isHovering
          ? 'rgba(0, 191, 255, 0.12)'
          : 'rgba(0, 191, 255, 0.6)',
        border: isHovering
          ? '1px solid rgba(0, 191, 255, 0.3)'
          : 'none',
        pointerEvents: 'none',
        zIndex: 500,
        mixBlendMode: isHovering ? 'normal' : 'screen',
      }}
      animate={{
        x: pos.x - (isHovering ? 20 : 6),
        y: pos.y - (isHovering ? 20 : 6),
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1 : 1,
      }}
      transition={{
        x: { type: 'spring', stiffness: 500, damping: 28 },
        y: { type: 'spring', stiffness: 500, damping: 28 },
        width: { duration: 0.2 },
        height: { duration: 0.2 },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
