import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechMetric {
  label: string;
  value: string;
  unit: string;
  color: string;
  animate: boolean;
}

export const TechShowcase: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemLoad, setSystemLoad] = useState(67);
  const [activeConnections, setActiveConnections] = useState(1247);
  const [isDark, setIsDark] = useState(true);
  
  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    updateTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Real-time updates to show system activity
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setSystemLoad(prev => Math.floor(Math.random() * 20) + 60); // 60-80%
      setActiveConnections(prev => prev + Math.floor(Math.random() * 10) - 5); // Fluctuating connections
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const techMetrics: TechMetric[] = [
    { label: "TARGET UPTIME", value: "99.9", unit: "%", color: "green", animate: true },
    { label: "TARGET LATENCY", value: "<30", unit: "ms", color: "blue", animate: true },
    { label: "DEV PROGRESS", value: systemLoad.toString(), unit: "%", color: "purple", animate: true },
    { label: "TEST NODES", value: activeConnections.toString(), unit: "", color: "yellow", animate: true },
  ];

  const codeSnippets = [
    "loading universal_parser_core...",
    "initializing identity_resolver...",
    "intent_based_solver: IN DEVELOPMENT",
    "protein_nlp_bridge: RESEARCH PHASE",
    "dna_protocol_stack: ALPHA TESTING",
    "adaptive_architecture: ACTIVE"
  ];

  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);

  useEffect(() => {
    const codeInterval = setInterval(() => {
      setCurrentCodeIndex(prev => (prev + 1) % codeSnippets.length);
    }, 3000);
    
    return () => clearInterval(codeInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`theme-card rounded-2xl p-8 border overflow-hidden relative ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-black to-blue-900/20 border-gray-700/50' 
          : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-gray-300/50'
      } backdrop-blur-sm`}
    >
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 49%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.3) 51%, transparent 52%),
            linear-gradient(0deg, transparent 49%, rgba(34, 197, 94, 0.3) 50%, rgba(34, 197, 94, 0.3) 51%, transparent 52%)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              {isDark ? 'EARTHFORM NEURAL CORE' : 'EARTHFORM CONTROL CENTER'}
            </h3>
            <p className={`text-sm font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentTime.toLocaleTimeString()} UTC | Node: {isDark ? 'NEURAL-ALPHA-001' : 'CONTROL-MAIN-001'}
            </p>
          </div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        </motion.div>

        {/* System Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {techMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-400">{metric.label}</span>
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    metric.color === 'green' ? 'bg-green-500' :
                    metric.color === 'blue' ? 'bg-blue-500' :
                    metric.color === 'purple' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  }`}
                  animate={metric.animate ? { 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.3, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex items-baseline space-x-1">
                <motion.span
                  className={`text-2xl font-bold ${
                    metric.color === 'green' ? 'text-green-400' :
                    metric.color === 'blue' ? 'text-blue-400' :
                    metric.color === 'purple' ? 'text-purple-400' :
                    'text-yellow-400'
                  }`}
                  animate={metric.animate ? { opacity: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {metric.value}
                </motion.span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Code Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-xl p-6 font-mono text-sm border ${
            isDark 
              ? 'bg-black/70 border-gray-700/50' 
              : 'bg-gray-900 border-gray-600 text-green-400'
          }`}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 ml-4">earthform@neural-core:~$</span>
          </div>
          
          <div className="space-y-2">
            {codeSnippets.slice(0, 4).map((line, index) => (
              <motion.div
                key={`${line}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-green-400"
              >
                <span className="text-gray-500">{'>'} </span>
                {line}
              </motion.div>
            ))}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCodeIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-blue-400"
              >
                <span className="text-gray-500">{'>'} </span>
                {codeSnippets[currentCodeIndex]}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  ▊
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-8">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
              >
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`} />
                <div className="text-xs text-gray-500 font-mono">
                  {index === 0 ? 'PARSER' :
                   index === 1 ? 'SOLVER' :
                   index === 2 ? 'PROTOCOL' :
                   'ARCH'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TechShowcase;
