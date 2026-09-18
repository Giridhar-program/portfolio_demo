import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1];

const NAV_ITEMS = [
  { id: "about",    label: "About" },
  { id: "skills",   label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact" },
];

function MenuButton({ label, onClick, isOpen, index }) {
  const [hovered, setHovered] = useState(false);
  const animatingRef = useRef(false);
  const pendingLeaveRef = useRef(false);
  const chars = label.split("");
  const lockDuration = 30 * chars.length + 300;

  const handleEnter = useCallback(() => {
    pendingLeaveRef.current = false;
    if (hovered) return;
    setHovered(true);
    animatingRef.current = true;
    setTimeout(() => {
      animatingRef.current = false;
      if (pendingLeaveRef.current) {
        pendingLeaveRef.current = false;
        setHovered(false);
      }
    }, lockDuration);
  }, [hovered, lockDuration]);

  const handleLeave = useCallback(() => {
    if (animatingRef.current) {
      pendingLeaveRef.current = true;
    } else {
      setHovered(false);
    }
  }, []);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="text-[#f7f1ed] text-[22px] uppercase leading-none overflow-hidden bg-transparent border-none cursor-pointer"
      style={{
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        letterSpacing: "0.08em",
        fontWeight: 700,
        height: "1em",
      }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: isOpen ? 0.4 + 0.08 * index : 0,
        ease,
      }}
    >
      <div className="flex justify-center">
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1em" }}
          >
            <span
              className="flex flex-col"
              style={{
                transitionProperty: "transform",
                transitionDuration: hovered ? "800ms" : "0ms",
                transitionDelay: hovered ? `${30 * i}ms` : "0ms",
                transform: hovered ? "translateY(-50%)" : "translateY(0%)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span className="block" style={{ height: "1em", lineHeight: "1em" }}>
                {char}
              </span>
              <span className="block" style={{ height: "1em", lineHeight: "1em" }} aria-hidden>
                {char}
              </span>
            </span>
          </span>
        ))}
      </div>
    </motion.button>
  );
}

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isProjectPage = location.pathname.startsWith("/project/");

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* Close on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (isProjectPage) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setIsOpen(false);
    navigate("/");
  };

  /* Items: on project page show Back, else show full nav */
  const menuItems = isProjectPage
    ? [{ id: "back", label: "← Back", onClick: handleBack }]
    : NAV_ITEMS.map((item) => ({ ...item, onClick: () => handleNavClick(item.id) }));

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-8 left-1/2 z-[100]"
      style={{ x: "-50%", pointerEvents: "auto", translateX: "-50%" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 2 }}
    >
      <motion.div
        className="relative overflow-hidden flex flex-col"
        onClick={() => {
          if (!isOpen) setIsOpen(true);
        }}
        style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          letterSpacing: "-0.02em",
          cursor: isOpen ? "default" : "pointer",
        }}
        animate={{
          width: isOpen ? (isProjectPage ? 200 : 300) : 150,
          height: isOpen ? (isProjectPage ? 100 : 310) : 48,
          borderRadius: isOpen ? 32 : 72,
          scale: 1,
        }}
        whileHover={isOpen ? undefined : { scale: 1.06 }}
        transition={{
          duration: 0.8,
          ease,
          height: { duration: isOpen ? 0.8 : 0.18 },
          scale: { duration: 0.25, ease },
        }}
      >
        {/* Accent color background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: "#F59E0B",
          }}
          transition={{ duration: 0.3, ease }}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#0099CC",
            borderRadius: "inherit",
          }}
        />

        {/* Dark circle expanding from bottom */}
        <motion.div
          className="absolute left-1/2 bg-[#0A0A0F]"
          style={{
            width: "200%",
            height: "200%",
            borderRadius: "50%",
            x: "-50%",
          }}
          animate={{ bottom: isOpen ? "-15%" : "-200%" }}
          transition={{
            duration: 0.8,
            ease,
            delay: isOpen ? 0.1 : 0,
          }}
        />

        {/* Menu items */}
        <div
          className="relative z-10 flex flex-col gap-5 items-center justify-center"
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
            flex: isOpen ? 1 : 0,
            overflow: "hidden",
          }}
        >
          {menuItems.map((item, idx) => (
            <MenuButton
              key={item.id}
              label={item.label}
              onClick={item.onClick}
              isOpen={isOpen}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom bar: Menu label + hamburger toggle */}
        <motion.div
          className="relative z-10 flex items-center justify-between w-full shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          animate={{
            paddingLeft: isOpen ? 22 : 18,
            paddingRight: isOpen ? 22 : 18,
            paddingBottom: isOpen ? 20 : 0,
            height: 48,
          }}
          transition={{ duration: 0.8, ease }}
          style={{ alignItems: "center" }}
        >
          <motion.span
            className="text-[14px] font-semibold leading-none tracking-wider uppercase"
            animate={{ color: isOpen ? "#f7f1ed" : "#0A0A0F" }}
            transition={{ duration: 0.3, ease }}
          >
            {isProjectPage && !isOpen ? "← Back" : "Menu"}
          </motion.span>

          {/* Animated hamburger → X */}
          <div className="relative w-[24px] h-[24px] flex items-center justify-center">
            <motion.span
              className="absolute block w-[18px] h-[2px] rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -3,
                backgroundColor: isOpen ? "#f7f1ed" : "#0A0A0F",
              }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.span
              className="absolute block w-[18px] h-[2px] rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 3,
                backgroundColor: isOpen ? "#f7f1ed" : "#0A0A0F",
              }}
              transition={{ duration: 0.4, ease }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
