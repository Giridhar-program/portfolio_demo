import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* =====================================================
   STANDARD BUTTON (shadcn-style)
   ===================================================== */
export const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:    "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:"bg-destructive text-primary-foreground hover:bg-destructive/90",
        cool:       "bg-gradient-to-t border border-b-2 border-zinc-950/40 from-primary to-primary/85 shadow-md shadow-primary/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 text-primary-foreground",
        outline:    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:  "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:      "hover:bg-accent hover:text-accent-foreground",
        link:       "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 rounded-md px-3 text-xs",
        lg:      "h-10 rounded-md px-8",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
);

export const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/* =====================================================
   LIQUID GLASS BUTTON
   ===================================================== */
export const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none rounded-full group",
  {
    variants: {
      variant: {
        default:     "text-amber-50 hover:text-white hover:scale-[1.02] active:scale-[0.98]",
        primary:     "text-zinc-950 font-bold hover:text-black hover:scale-[1.02] active:scale-[0.98]",
        destructive: "text-red-400 hover:text-red-300 hover:scale-[1.02] active:scale-[0.98]",
        outline:     "text-amber-100 hover:text-white hover:scale-[1.02] active:scale-[0.98]",
        secondary:   "text-zinc-300 hover:text-white hover:scale-[1.02] active:scale-[0.98]",
        ghost:       "text-amber-200 hover:text-amber-100 hover:scale-[1.02] active:scale-[0.98]",
        link:        "text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm:      "h-8 text-xs gap-1.5 px-4",
        lg:      "h-10 px-6",
        xl:      "h-12 px-8 text-base tracking-wide",
        xxl:     "h-14 px-10 text-lg tracking-wide",
        icon:    "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "xxl",
    },
  }
);

export function LiquidButton({
  className,
  variant = "default",
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const isPrimary = variant === "primary";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "relative",
        liquidbuttonVariants({ variant, size, className }),
        isPrimary ? "font-bold hover:scale-[1.02] active:scale-[0.98]" : "hover:scale-[1.02] active:scale-[0.98]"
      )}
      style={{ color: isPrimary ? "var(--color-text-inverse)" : "var(--color-text)", ...props.style }}
      {...props}
    >
      {/* Base Layer */}
      <div className={cn(
        "absolute inset-0 z-0 rounded-full backdrop-blur-2xl transition-all duration-500",
        isPrimary 
          ? "bg-[var(--color-primary)] hover:brightness-110"
          : "bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-hover)]"
      )} />
      
      {/* Border & Glow */}
      <div className={cn(
        "absolute inset-0 z-0 rounded-full border transition-all duration-500",
        isPrimary
          ? "border-[var(--color-border)] shadow-[var(--shadow-glow-blue)]"
          : "border-[var(--color-border)] hover:border-[var(--color-border-hover)] shadow-[var(--shadow-float)]"
      )} />
      
      {/* Top reflection highlight */}
      <div className={cn(
        "absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none transition-all duration-500",
        isPrimary ? "opacity-40 group-hover:opacity-60" : "opacity-10 group-hover:opacity-20"
      )} />

      {/* Content */}
      <div className={cn(
        "relative z-10 flex items-center justify-center drop-shadow-sm",
        isPrimary && "drop-shadow-none"
      )}>
        {children}
      </div>
    </Comp>
  );
}

/* =====================================================
   METAL BUTTON
   ===================================================== */
const colorVariants = {
  default: {
    outer:      "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner:      "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button:     "bg-gradient-to-b from-[#B9B9B9] to-[#969696]",
    textColor:  "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  primary: {
    outer:      "bg-gradient-to-b from-[#000080] to-[#4169E1]",
    inner:      "bg-gradient-to-b from-[#6495ED] via-[#00008B] to-[#87CEEB]",
    button:     "bg-gradient-to-b from-[#3942c6] to-[#23256e]",
    textColor:  "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(30_58_138_/_100%)]",
  },
  success: {
    outer:      "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner:      "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    button:     "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]",
    textColor:  "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer:      "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner:      "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    button:     "bg-gradient-to-b from-[#F08D8F] to-[#A45253]",
    textColor:  "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
  gold: {
    outer:      "bg-gradient-to-b from-[#917100] to-[#EAD98F]",
    inner:      "bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]",
    button:     "bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]",
    textColor:  "text-[#FFFDE5]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(178_140_2_/_100%)]",
  },
  magenta: {
    outer:      "bg-gradient-to-b from-[#7A0040] to-[#FF5AA0]",
    inner:      "bg-gradient-to-b from-[#FFD6E8] via-[#5A0030] to-[#FFB0D0]",
    button:     "bg-gradient-to-b from-[#5978c3] to-[#3d4b7a]",
    textColor:  "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(120_0_60_/_100%)]",
  },
};

function getMetalStyles(variant = "default", isPressed, isHovered, isTouchDevice) {
  const colors = colorVariants[variant] ?? colorVariants.default;
  const trans = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

  return {
    wrapper: cn("relative inline-flex transform-gpu rounded-md p-[1.25px] will-change-transform", colors.outer),
    wrapperStyle: {
      transform:    isPressed ? "translateY(2.5px) scale(0.99)" : "translateY(0) scale(1)",
      boxShadow:    isPressed ? "0 1px 2px rgba(0,0,0,0.15)" : isHovered && !isTouchDevice ? "0 4px 12px rgba(0,0,0,0.18)" : "0 3px 8px rgba(0,0,0,0.1)",
      transition:   trans,
      transformOrigin: "center center",
    },
    inner: cn("absolute inset-[1px] transform-gpu rounded-lg will-change-transform", colors.inner),
    innerStyle: {
      transition: trans,
      filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none",
    },
    button: cn(
      "relative z-10 m-[1px] rounded-md inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden px-6 py-2 text-sm leading-none font-semibold will-change-transform outline-none",
      colors.button, colors.textColor, colors.textShadow
    ),
    buttonStyle: {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition: trans,
      filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none",
    },
  };
}

const ShineEffect = ({ isPressed }) => (
  <div className={cn("pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300", isPressed ? "opacity-20" : "opacity-0")}>
    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
  </div>
);

export const MetalButton = React.forwardRef(
  ({ children, className, variant = "default", ...props }, ref) => {
    const [isPressed,  setIsPressed]  = React.useState(false);
    const [isHovered,  setIsHovered]  = React.useState(false);
    const [isTouch,    setIsTouch]    = React.useState(false);

    React.useEffect(() => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    const styles = getMetalStyles(variant, isPressed, isHovered, isTouch);

    return (
      <div className={styles.wrapper} style={styles.wrapperStyle}>
        <div className={styles.inner} style={styles.innerStyle} />
        <button
          ref={ref}
          className={cn(styles.button, className)}
          style={styles.buttonStyle}
          {...props}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
          onMouseEnter={() => { if (!isTouch) setIsHovered(true); }}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          onTouchCancel={() => setIsPressed(false)}
        >
          <ShineEffect isPressed={isPressed} />
          {children}
          {isHovered && !isPressed && !isTouch && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t rounded-lg from-transparent to-white/5" />
          )}
        </button>
      </div>
    );
  }
);
MetalButton.displayName = "MetalButton";
