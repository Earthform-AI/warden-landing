import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackNavigation } from '../utils/analytics.ts';

interface NavProps {
  links?: Array<{ label: string; href: string }>;
}

export const TechNavigation: React.FC<NavProps> = ({ links = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleNavClick = (href: string, label: string, source: string = 'desktop_nav') => {
    trackNavigation(href, source);
  };

  const handleMobileNavClick = (href: string, label: string) => {
    handleNavClick(href, label, 'mobile_nav');
    setIsMenuOpen(false);
  };

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    // Always set to dark mode since we're removing the toggle
    document.documentElement.classList.add('dark');
    document.body.style.background = 'linear-gradient(135deg, #000000 0%, #0f172a 30%, #1e293b 70%, #000000 100%)';
    document.body.style.color = '#ffffff';
    document.documentElement.style.colorScheme = 'dark';
    document.body.classList.add('dark-mode-active');
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-white">Earthform</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-glass"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-white"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Earthform
            </span>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-mono mt-1 text-cyan-400"
            >
              ◦ RESEARCH LAB
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href, link.label)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-sm font-medium transition-all duration-200 relative group text-gray-300 hover:text-cyan-300"
              >
                <span className="flex items-center gap-2">
                  {link.label === 'Roadmap' && '🗺️'}
                  {link.label === 'Mission' && '🚀'}
                  {link.label === 'Ecosystem' && '🤖'}
                  {link.label === 'Community' && '💬'}
                  {link.label === 'Join' && '⚡'}
                  {link.label === 'Home' && '🏠'}
                  {link.label}
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* Research status indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, type: "spring" }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border bg-gray-900/50 border-gray-700/50 backdrop-blur-sm"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span className="text-xs font-mono text-gray-400">3 papers</span>
            </motion.div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl border-2 text-cyan-400 hover:bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg"
            >
              {isMenuOpen ? '✕' : '☰'}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t-2 border-cyan-500/30 bg-gray-900/95 backdrop-blur-lg"
            >
              <div className="px-4 py-4 space-y-4">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMobileNavClick(link.href, link.label)}
                    className="block text-sm font-medium transition-all duration-200 p-3 rounded-lg text-gray-300 hover:text-cyan-300 hover:bg-gray-800/50"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};