import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}) => {
  const variants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    fade: { opacity: 0 }
  };

  const animate = {
    y: 0,
    x: 0,
    opacity: 1
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
}

export const TechCard: React.FC<TechCardProps> = ({ 
  children, 
  className = '',
  delay = 0,
  glowColor = 'blue'
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        boxShadow: glowColor === 'blue' 
          ? '0 20px 40px rgba(59, 130, 246, 0.2)' 
          : glowColor === 'green'
          ? '0 20px 40px rgba(34, 197, 94, 0.2)'
          : '0 20px 40px rgba(168, 85, 247, 0.2)'
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export const AnimatedCounter: React.FC<CounterProps> = ({ 
  end, 
  duration = 2, 
  suffix = '' 
}) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < end) {
          return Math.min(prev + Math.ceil(end / (duration * 60)), end);
        }
        return prev;
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TechButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tech';
}

export const TechButton: React.FC<TechButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary'
}) => {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600",
    tech: "bg-black text-green-400 border border-green-500/30 hover:border-green-500 font-mono"
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <motion.div
        initial={false}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-white/10"
        style={{ x: "-100%" }}
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
};
