import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, TechButton, AnimatedCounter } from './FramerMotionComponents.tsx';

interface HeroProps {
  title: string;
  subtitle: string;
  quote: string;
  cta: {
    text: string;
    link: string;
  };
}

export const EnhancedHeroSection: React.FC<HeroProps> = ({ title, subtitle, quote, cta }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent),
              linear-gradient(-45deg, transparent 24%, rgba(34, 197, 94, 0.1) 25%, rgba(34, 197, 94, 0.1) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, 0.1) 75%, rgba(34, 197, 94, 0.1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Tech Grid Overlay - Hidden on mobile to avoid interference */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none overflow-hidden">
        {/* Scanning Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{ 
            y: [0, 800],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 3
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
          animate={{ 
            x: [0, 1200],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear",
            delay: 2,
            repeatDelay: 4
          }}
        />
        
        {/* Corner Elements */}
        <motion.div 
          className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-400/40"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-green-400/40"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        {/* Data Points - Far from content center */}
        <motion.div 
          className="absolute top-20 right-8 flex items-center space-x-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <AnimatedSection direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.4}>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.6}>
            <p className="text-lg md:text-xl mb-12 opacity-70 italic max-w-2xl mx-auto leading-relaxed">
              "{quote}"
            </p>
          </AnimatedSection>

          {/* Tech Stats */}
          <AnimatedSection direction="up" delay={0.8}>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  <AnimatedCounter end={15000} duration={2} suffix="+" />
                </div>
                <div className="text-sm opacity-70">Mining deaths yearly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  <AnimatedCounter end={60} duration={2} suffix="%" />
                </div>
                <div className="text-sm opacity-70">Preventable incidents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  <AnimatedCounter end={24} duration={2} suffix="/7" />
                </div>
                <div className="text-sm opacity-70">AI Monitoring</div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={1.0}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TechButton 
                href={cta.link}
                variant="primary"
                className="px-8 py-4 text-lg rounded-xl shadow-2xl"
              >
                {cta.text}
              </TechButton>
              
              <TechButton 
                href="/mission"
                variant="tech"
                className="px-8 py-4 text-lg rounded-xl"
              >
                <span className="flex items-center gap-2">
                  <span>View Mission</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </TechButton>
            </div>
          </AnimatedSection>

          {/* System Status Indicator */}
          <AnimatedSection direction="fade" delay={1.2}>
            <div className="mt-16 flex items-center justify-center gap-4 text-sm font-mono opacity-60">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span>WARDEN.SYS.ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
                <span>AI.SHIELD.ACTIVE</span>
              </div>
            </div>
          </AnimatedSection>
        </motion.div>
      </div>

      {/* Scroll Indicator - Better centered across all devices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl text-white/60 mb-2 flex justify-center"
        >
          ↓
        </motion.div>
        <div className="text-xs text-gray-400 tracking-wide text-center px-4">
          Scroll to explore
        </div>
      </motion.div>
    </section>
  );
};
