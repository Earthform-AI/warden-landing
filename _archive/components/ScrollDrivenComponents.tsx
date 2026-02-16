import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Hook for scroll progress tracking
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return { scrollProgress: scrollYProgress, springProgress: scaleX };
};

// Scroll Progress Indicator
export const ScrollProgressBar: React.FC = () => {
  const { springProgress } = useScrollProgress();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 origin-left z-50"
      style={{ scaleX: springProgress }}
    />
  );
};

// Parallax Section Component
interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative for reverse
  yOffset?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  yOffset = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, yOffset + (speed * 100)]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Sticky Reveal Section
interface StickyRevealProps {
  children: React.ReactNode[];
  className?: string;
  stickyHeight?: string;
}

export const StickyRevealSection: React.FC<StickyRevealProps> = ({
  children,
  className = '',
  stickyHeight = '100vh'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${children.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {children.map((child, index) => {
          const start = index / children.length;
          const end = (index + 1) / children.length;
          
          const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
          const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.8]);
          const y = useTransform(scrollYProgress, [start, end], [50, -50]);
          
          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity, scale, y }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Scroll-linked Animation Wrapper
interface ScrollLinkedAnimationProps {
  children: React.ReactNode;
  className?: string;
  startProgress?: number;
  endProgress?: number;
  transformValues?: {
    x?: [number, number];
    y?: [number, number];
    scale?: [number, number];
    rotate?: [number, number];
    opacity?: [number, number];
  };
}

export const ScrollLinkedAnimation: React.FC<ScrollLinkedAnimationProps> = ({
  children,
  className = '',
  startProgress = 0,
  endProgress = 1,
  transformValues = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const progressRange = [startProgress, endProgress];
  
  const transforms = {
    x: transformValues.x ? useTransform(scrollYProgress, progressRange, transformValues.x) : undefined,
    y: transformValues.y ? useTransform(scrollYProgress, progressRange, transformValues.y) : undefined,
    scale: transformValues.scale ? useTransform(scrollYProgress, progressRange, transformValues.scale) : undefined,
    rotate: transformValues.rotate ? useTransform(scrollYProgress, progressRange, transformValues.rotate) : undefined,
    opacity: transformValues.opacity ? useTransform(scrollYProgress, progressRange, transformValues.opacity) : undefined,
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={transforms}
    >
      {children}
    </motion.div>
  );
};

// Scroll Snap Container
interface ScrollSnapContainerProps {
  children: React.ReactNode;
  className?: string;
  snapType?: 'x' | 'y' | 'both';
  snapAlign?: 'start' | 'center' | 'end';
}

export const ScrollSnapContainer: React.FC<ScrollSnapContainerProps> = ({
  children,
  className = '',
  snapType = 'y',
  snapAlign = 'start'
}) => {
  const snapStyle = {
    scrollSnapType: snapType === 'both' ? 'both mandatory' : `${snapType} mandatory`,
  };
  
  return (
    <div 
      className={`${className}`} 
      style={{
        ...snapStyle,
        scrollBehavior: 'smooth'
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div 
          key={index}
          style={{ scrollSnapAlign: snapAlign }}
          className="min-h-screen"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Text Reveal on Scroll
interface TextRevealProps {
  text: string;
  className?: string;
  splitBy?: 'word' | 'char';
  staggerDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  splitBy = 'word',
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  const items = splitBy === 'word' ? text.split(' ') : text.split('');
  
  return (
    <div ref={ref} className={className}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8,
            delay: index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block"
        >
          {item}{splitBy === 'word' ? ' ' : ''}
        </motion.span>
      ))}
    </div>
  );
};

// Morphing Background based on scroll
interface MorphingBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradientStops?: Array<{
    position: number; // 0-1
    colors: string;
  }>;
}

export const MorphingBackground: React.FC<MorphingBackgroundProps> = ({
  children,
  className = '',
  gradientStops = [
    { position: 0, colors: 'from-gray-900 via-black to-gray-900' },
    { position: 0.3, colors: 'from-blue-900 via-black to-purple-900' },
    { position: 0.6, colors: 'from-green-900 via-black to-blue-900' },
    { position: 1, colors: 'from-purple-900 via-black to-green-900' },
  ]
}) => {
  const { scrollYProgress } = useScroll();
  const [currentGradient, setCurrentGradient] = useState(gradientStops[0].colors);
  
  useEffect(() => {
    return scrollYProgress.onChange(progress => {
      const currentStop = gradientStops.find((stop, index) => {
        const nextStop = gradientStops[index + 1];
        return progress >= stop.position && (!nextStop || progress < nextStop.position);
      });
      
      if (currentStop && currentStop.colors !== currentGradient) {
        setCurrentGradient(currentStop.colors);
      }
    });
  }, [scrollYProgress, gradientStops, currentGradient]);
  
  return (
    <div className={`transition-all duration-1000 bg-gradient-to-br ${currentGradient} ${className}`}>
      {children}
    </div>
  );
};

// Scroll-triggered counter
interface ScrollTriggeredCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  className?: string;
  triggerOnce?: boolean;
}

export const ScrollTriggeredCounter: React.FC<ScrollTriggeredCounterProps> = ({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  className = '',
  triggerOnce = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-20%" });
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const startValue = start;
      const endValue = end;
      
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      updateCount();
    }
  }, [isInView, start, end, duration]);
  
  return (
    <div ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </div>
  );
};

// Progressive disclosure component
interface ProgressiveDisclosureProps {
  sections: Array<{
    title: string;
    content: React.ReactNode;
    triggerPoint?: number; // 0-1
  }>;
  className?: string;
}

export const ProgressiveDisclosure: React.FC<ProgressiveDisclosureProps> = ({
  sections,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  return (
    <div ref={containerRef} className={className}>
      {sections.map((section, index) => {
        const triggerPoint = section.triggerPoint || (index / sections.length);
        const opacity = useTransform(
          scrollYProgress, 
          [triggerPoint, triggerPoint + 0.1], 
          [0, 1]
        );
        const y = useTransform(
          scrollYProgress, 
          [triggerPoint, triggerPoint + 0.1], 
          [50, 0]
        );
        
        return (
          <motion.div
            key={index}
            className="mb-16"
            style={{ opacity, y }}
          >
            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
            {section.content}
          </motion.div>
        );
      })}
    </div>
  );
};
