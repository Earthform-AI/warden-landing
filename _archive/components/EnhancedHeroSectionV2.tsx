import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, TechButton, AnimatedCounter } from './FramerMotionComponents.tsx';
import { ParallaxSection, ScrollLinkedAnimation, TextReveal } from './ScrollDrivenComponents.tsx';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900/50 to-black scroll-snap-section">
      {/* Background Pattern */}
      <ParallaxSection speed={0.2} className="absolute inset-0 opacity-20">
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
      </ParallaxSection>
      
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

      {/* Main Content with Scroll-linked Animation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <ScrollLinkedAnimation
          transformValues={{
            y: [100, -50],
            opacity: [0, 1]
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Title */}
            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent tracking-wide">
                {title}
              </h1>
            </AnimatedSection>

            {/* Subtitle */}
            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200 tracking-normal">
                {subtitle}
              </p>
            </AnimatedSection>

            {/* Quote */}
            <AnimatedSection direction="up" delay={0.6}>
              <p className="text-lg md:text-xl mb-12 italic max-w-2xl mx-auto leading-relaxed text-gray-300 tracking-normal">
                "{quote}"
              </p>
            </AnimatedSection>

            {/* Tech Stats */}
            <AnimatedSection direction="up" delay={0.8}>
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-center group">
                    <div className="relative p-4 rounded-xl bg-blue-900/20 hover:bg-blue-900/30 transition-all duration-300">
                      <div className="text-3xl font-bold text-blue-400">
                        <span>Alpha</span>
                      </div>
                      <div className="text-sm text-gray-300">Development Phase</div>
                      <div className="text-xs text-gray-400">Active research</div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-center group">
                    <div className="relative p-4 rounded-xl bg-green-900/20 hover:bg-green-900/30 transition-all duration-300">
                      <div className="text-3xl font-bold text-green-400">
                        <span>Open</span>
                      </div>
                      <div className="text-sm text-gray-300">Source Development</div>
                      <div className="text-xs text-gray-400">Community-driven</div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="text-center group">
                    <div className="relative p-4 rounded-xl bg-purple-900/20 hover:bg-purple-900/30 transition-all duration-300">
                      <div className="text-3xl font-bold text-purple-400">
                        <span>Future</span>
                      </div>
                      <div className="text-sm text-gray-300">Foundation First</div>
                      <div className="text-xs text-gray-400">Building the platform</div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Research transparency note */}
            <AnimatedSection direction="up" delay={0.8}>
              <div className="flex justify-center mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-blue-900/20 border border-blue-700/30 rounded-lg px-4 py-2"
                >
                  <a href="/research" className="text-xs text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-2">
                    <span>🔬</span>
                    <span>Learn about our research approach</span>
                    <span>→</span>
                  </a>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection direction="up" delay={1.0}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <TechButton 
                  href={cta.link}
                  variant="primary"
                  className="px-8 py-4 text-lg rounded-xl shadow-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold transition-all duration-300 hover:scale-105"
                >
                  {cta.text}
                </TechButton>
                
                <TechButton 
                  href="/mission"
                  variant="tech"
                  className="px-8 py-4 text-lg rounded-xl border-2 border-gray-600 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
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

            {/* System Status */}
            <AnimatedSection direction="fade" delay={1.2}>
              <div className="mt-16 flex items-center justify-center gap-4 text-sm font-mono">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span className="text-gray-300 tracking-wider">EARTHFORMOS.RESEARCH</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                  <span className="text-gray-300 tracking-wider">DEV.ACTIVE</span>
                </div>
              </div>
            </AnimatedSection>
          </motion.div>
        </ScrollLinkedAnimation>
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
