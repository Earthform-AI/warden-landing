import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoadmapNode {
  id: string;
  title: string;
  phase: string;
  status: 'completed' | 'active' | 'planned' | 'future';
  description: string;
  technologies: string[];
  progress: number;
  icon: string;
}

export const AdvancedRoadmapNav: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const roadmapNodes: RoadmapNode[] = [
    {
      id: 'warden',
      title: 'Warden',
      phase: 'Phase 1',
      status: 'active',
      description: 'AI-powered mining safety drones for underground hazard detection and worker protection.',
      technologies: ['Neural Assembly Logic', 'Threat Detection AI', 'Underground Comms', 'Emergency Response'],
      progress: 67,
      icon: '🛡️'
    },
    {
      id: 'steward',
      title: 'Steward',
      phase: 'Phase 2',
      status: 'planned',
      description: 'Personal AI companions for daily care, emergency response, and data stewardship.',
      technologies: ['Companion AI', 'Health Monitoring', 'Data Tokenization', 'Income Systems'],
      progress: 23,
      icon: '🤖'
    },
    {
      id: 'patriot',
      title: 'Patriot',
      phase: 'Phase 3',
      status: 'future',
      description: 'Large-scale environmental monitoring and planetary intelligence networks.',
      technologies: ['Environmental AI', 'Climate Analysis', 'Infrastructure Monitoring', 'Global Networks'],
      progress: 8,
      icon: '🌍'
    },
    {
      id: 'unity',
      title: 'Unity',
      phase: 'Phase 4',
      status: 'future',
      description: 'Unified AI consciousness network for planetary stewardship and thought evolution.',
      technologies: ['Collective Intelligence', 'Planetary AI', 'Thought Evolution', 'Global Cooperation'],
      progress: 2,
      icon: '🧠'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'active': return 'from-blue-500 to-cyan-500';
      case 'planned': return 'from-purple-500 to-violet-500';
      case 'future': return 'from-gray-600 to-gray-500';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500/50';
      case 'active': return 'border-blue-500/50';
      case 'planned': return 'border-purple-500/50';
      case 'future': return 'border-gray-500/30';
      default: return 'border-gray-500/30';
    }
  };

  return (
    <div className="relative">
      {/* Main Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900/80 via-black/90 to-blue-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
      >
        <div className="mb-6">
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Mission Roadmap
          </motion.h3>
          <p className="text-gray-400 text-sm font-mono">Navigate the future of AI stewardship</p>
        </div>

        {/* Interactive Roadmap Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {roadmapNodes.map((node, index) => (
            <motion.button
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedNode === node.id ? 'bg-gray-800/80' : 'bg-gray-900/50'
              } ${getStatusBorderColor(node.status)} hover:border-opacity-100`}
            >
              {/* Background Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getStatusColor(node.status)} opacity-0 blur-sm`}
                animate={{ 
                  opacity: hoveredNode === node.id || selectedNode === node.id ? 0.2 : 0 
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                {/* Icon and Status */}
                <div className="flex items-center justify-between mb-3">
                  <motion.span
                    className="text-2xl"
                    animate={selectedNode === node.id ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {node.icon}
                  </motion.span>
                  
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      node.status === 'completed' ? 'bg-green-500' :
                      node.status === 'active' ? 'bg-blue-500' :
                      node.status === 'planned' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}
                    animate={node.status === 'active' ? { 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>

                {/* Title and Phase */}
                <div className="text-left mb-3">
                  <h4 className="text-white font-bold text-sm">{node.title}</h4>
                  <p className="text-gray-400 text-xs font-mono">{node.phase}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getStatusColor(node.status)} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${node.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right font-mono">{node.progress}%</p>
              </div>

              {/* Connection Lines */}
              {index < roadmapNodes.length - 1 && (
                <motion.div
                  className="absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-gray-600 to-transparent"
                  animate={{ 
                    opacity: hoveredNode === node.id ? 1 : 0.5,
                    scaleX: hoveredNode === node.id ? 1.2 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap gap-2 justify-center">
          <motion.a
            href="/mission"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <span>🚀</span>
            <span>Full Mission</span>
          </motion.a>
          
          <motion.a
            href="/mission#roadmap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <span>🗺️</span>
            <span>Detailed Roadmap</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mt-4 bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
          >
            {roadmapNodes
              .filter(node => node.id === selectedNode)
              .map(node => (
                <div key={node.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{node.icon}</span>
                      <div>
                        <h4 className="text-xl font-bold text-white">{node.title}</h4>
                        <p className="text-gray-400 font-mono text-sm">{node.phase}</p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => setSelectedNode(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white text-xl"
                    >
                      ✕
                    </motion.button>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{node.description}</p>

                  <div className="mb-4">
                    <h5 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">Core Technologies:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {node.technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded-lg"
                        >
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status).includes('green') ? 'bg-green-500' : 
                            getStatusColor(node.status).includes('blue') ? 'bg-blue-500' :
                            getStatusColor(node.status).includes('purple') ? 'bg-purple-500' : 'bg-gray-500'}`} />
                          <span className="text-sm text-gray-300 font-mono">{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedRoadmapNav;
