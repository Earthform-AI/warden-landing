import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './FramerMotionComponents';

export const ThemeDemoSection: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="py-20 relative">
        {/* Light mode exclusive background */}
        <div className="light-mode-only absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50" />
        
        {/* Dark mode exclusive background */}
        <div className="dark-mode-only absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-black opacity-80" />
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="dark-mode-only bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Neural Interface Active
              </span>
              <span className="light-mode-only bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Advanced Systems Online
              </span>
            </h2>
            <p className="text-lg">
              <span className="dark-mode-only text-gray-300">
                Experience our technology through adaptive dark neural interfaces designed for deep focus and extended interaction.
              </span>
              <span className="light-mode-only text-gray-700">
                Explore our clean, professional interface optimized for clarity and accessibility in any environment.
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Demo Card 1 */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="theme-card p-6 rounded-xl transition-all duration-300"
            >
              <div className="mb-4">
                <div className="dark-mode-only w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🌙</span>
                </div>
                <div className="light-mode-only w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">☀️</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 theme-aware-text">
                <span className="dark-mode-only">Neural Mode</span>
                <span className="light-mode-only">Professional Mode</span>
              </h3>
              <p className="theme-aware-text-secondary text-sm">
                <span className="dark-mode-only">
                  Immersive dark interface with glowing accents and neural-inspired animations for deep technical work.
                </span>
                <span className="light-mode-only">
                  Clean, bright interface with subtle shadows and professional gradients for clear documentation and presentations.
                </span>
              </p>
            </motion.div>

            {/* Demo Card 2 */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="theme-card p-6 rounded-xl transition-all duration-300"
            >
              <div className="mb-4">
                <div className="dark-mode-only w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="light-mode-only w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🌱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 theme-aware-text">
                <span className="dark-mode-only">AI Integration</span>
                <span className="light-mode-only">Natural Integration</span>
              </h3>
              <p className="theme-aware-text-secondary text-sm">
                <span className="dark-mode-only">
                  Cyberpunk-inspired data streams and matrix effects that showcase our advanced AI capabilities.
                </span>
                <span className="light-mode-only">
                  Earth-toned, organic designs that emphasize our commitment to environmental stewardship and sustainability.
                </span>
              </p>
            </motion.div>

            {/* Demo Card 3 */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="theme-card p-6 rounded-xl transition-all duration-300"
            >
              <div className="mb-4">
                <div className="dark-mode-only w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <div className="light-mode-only w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🔥</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 theme-aware-text">
                <span className="dark-mode-only">High Performance</span>
                <span className="light-mode-only">Reliable Systems</span>
              </h3>
              <p className="theme-aware-text-secondary text-sm">
                <span className="dark-mode-only">
                  Electric aesthetics with pulsing animations that demonstrate our cutting-edge technological prowess.
                </span>
                <span className="light-mode-only">
                  Warm, confident colors with steady animations that convey reliability and trustworthy engineering.
                </span>
              </p>
            </motion.div>
          </div>

          {/* Theme Toggle CTA */}
          <motion.div
            className="mt-12 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="theme-card p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 theme-aware-text">
                <span className="dark-mode-only">Toggle to Light Mode</span>
                <span className="light-mode-only">Toggle to Dark Mode</span>
              </h3>
              <p className="theme-aware-text-secondary mb-6">
                <span className="dark-mode-only">
                  Switch to our professional light interface for presentations, documentation, or daytime work.
                </span>
                <span className="light-mode-only">
                  Switch to our immersive dark interface for deep technical work, coding, or evening sessions.
                </span>
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm font-mono">
                <div className="dark-mode-only flex items-center space-x-2 text-cyan-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>NEURAL MODE ACTIVE</span>
                </div>
                <div className="light-mode-only flex items-center space-x-2 text-indigo-600">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                  <span>PROFESSIONAL MODE ACTIVE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ThemeDemoSection;
