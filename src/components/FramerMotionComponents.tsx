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

// Advanced Tech Loading Animation
export const TechLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 border-2 border-transparent rounded-full ${
            i === 0 ? 'border-t-blue-500' : 
            i === 1 ? 'border-r-green-500' : 
            'border-b-purple-500'
          }`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.2
          }}
        />
      ))}
      <div className="absolute inset-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full" />
    </div>
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
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any; // Allow any additional props
}

export const TechButton: React.FC<TechButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  type,
  ...rest
}) => {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600",
    tech: "bg-black text-green-400 border border-green-500/30 hover:border-green-500 font-mono"
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, ...rest } : { onClick, type, ...rest };

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

// Advanced Matrix Code Effect
export const MatrixCode: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [streams, setStreams] = React.useState<string[]>([]);

  React.useEffect(() => {
    const chars = '0123456789ABCDEF';
    const newStreams = Array.from({ length: 20 }, () => 
      Array.from({ length: 15 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    );
    setStreams(newStreams);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden opacity-10 pointer-events-none ${className}`}>
      {streams.map((stream, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-green-500"
          style={{ 
            left: `${(i * 5) % 100}%`,
            top: `-100px`
          }}
          animate={{ y: ['0vh', '120vh'] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        >
          {stream.split('').map((char, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: [1, 0.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: j * 0.1,
                repeat: Infinity
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Holographic Border Effect
export const HoloBorder: React.FC<{ 
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}> = ({ children, className = '', intensity = 'medium' }) => {
  const intensityMap = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Animated border */}
      <motion.div
        className={`absolute inset-0 rounded-lg ${intensityMap[intensity]}`}
        style={{
          background: 'linear-gradient(45deg, transparent 49%, cyan 50%, cyan 51%, transparent 52%)',
          backgroundSize: '20px 20px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Particle System Background
export const ParticleField: React.FC<{ particleCount?: number }> = ({ particleCount = 30 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};
