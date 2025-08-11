import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, TechButton, FloatingElement, AnimatedCounter } from './FramerMotionComponents.tsx';
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
      
      {/* Floating Tech Elements */}
      <FloatingElement className="absolute top-20 left-10" delay={0}>
        <motion.div 
          className="w-3 h-3 bg-blue-500 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </FloatingElement>
      <FloatingElement className="absolute top-32 right-20" delay={2}>
        <motion.div 
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </FloatingElement>
      <FloatingElement className="absolute bottom-32 left-20" delay={4}>
        <motion.div 
          className="w-4 h-4 bg-purple-500 rounded-full"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </FloatingElement>

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
                    <div className="relative p-4 rounded-xl bg-red-900/20 hover:bg-red-900/30 transition-all duration-300">
                      <div className="text-3xl font-bold text-red-400">
                        <AnimatedCounter end={15000} duration={2} suffix="+" />
                      </div>
                      <div className="text-sm text-gray-300">Mining deaths yearly</div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
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
                    <div className="relative p-4 rounded-xl bg-orange-900/20 hover:bg-orange-900/30 transition-all duration-300">
                      <div className="text-3xl font-bold text-orange-400">
                        <AnimatedCounter end={60} duration={2} suffix="%" />
                      </div>
                      <div className="text-sm text-gray-300">Preventable incidents</div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500/20 to-orange-600/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
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
                    <div className="relative p-4 rounded-xl bg-green-900/20 hover:bg-green-900/30 transition-all duration-300">
                      <div className="text-3xl font-bold text-green-400">
                        <AnimatedCounter end={24} duration={2} suffix="/7" />
                      </div>
                      <div className="text-sm text-gray-300">AI Monitoring</div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
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
                  <span className="text-gray-300 tracking-wider">WARDEN.SYS.ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                  <span className="text-gray-300 tracking-wider">AI.SHIELD.ACTIVE</span>
                </div>
              </div>
            </AnimatedSection>
          </motion.div>
        </ScrollLinkedAnimation>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl text-white/60 mb-2"
        >
          ↓
        </motion.div>
        <div className="text-xs text-gray-400 tracking-wide">
          Scroll to explore
        </div>
      </motion.div>
    </section>
  );
};
