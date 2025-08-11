import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, TechButton, FloatingElement, AnimatedCounter } from './FramerMotionComponents.tsx';

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

      {/* Floating Tech Elements */}
      <FloatingElement className="absolute top-20 left-10" delay={0}>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
      </FloatingElement>
      <FloatingElement className="absolute top-32 right-20" delay={2}>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-32 left-20" delay={4}>
        <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
      </FloatingElement>

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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-sm"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};
