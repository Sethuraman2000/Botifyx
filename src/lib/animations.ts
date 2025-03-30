
import { Variants } from 'framer-motion';

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    }
  }
};

// Fade up for text and elements
export const fadeUp: Variants = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Button hover effect
export const buttonHover: Variants = {
  initial: {},
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
      ease: "easeInOut"
    }
  }
};

// Chat message bubble animation
export const messageBubble: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Fancy blur gradient
export const blurGradient: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

// Typing indicator animation
export const typingIndicator: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    }
  }
};

export const typingDot: Variants = {
  initial: {
    y: 0
  },
  animate: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 1.4,
      ease: "easeInOut",
      repeatType: "loop"
    }
  }
};
