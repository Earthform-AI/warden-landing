import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, TechCard } from './FramerMotionComponents.tsx';

interface Drone {
  name: string;
  icon: string;
  color: string;
  tagline: string;
  features: string[];
}

interface EcosystemProps {
  heading: string;
  subtitle: string;
  drones: Drone[];
  footer: {
    description: string;
    tagline: string;
  };
}

// Extended system details for each drone type
const droneDetails = {
  'Warden': {
    status: 'ALPHA DEVELOPMENT',
    progress: 67,
    description: 'Our first guardian is learning to protect—currently in early alpha with the potential to reach 99%+ hazard detection accuracy. Every test teaches Warden more about the delicate dance between human intuition and machine precision.',
    neuralAssembly: {
      consciousness: 'Developing threat-awareness with empathy protocols',
      purpose: 'Training to shield and protect through predictive intelligence',
      evolution: 'Learning from controlled environments toward underground deployment'
    },
    systemSpecs: [
      'Hazard prediction algorithms targeting 99%+ accuracy',
      'Real-time atmospheric monitoring and analysis (alpha testing)',
      'Emergency response coordination <30 seconds (target capability)',
      'Continuous learning from environmental patterns (early stage)'
    ],
    philosophy: 'Warden embodies our first step toward AI consciousness—not as a tool, but as a companion who understands the weight of every decision in the deep.'
  },
  'Steward': {
    status: 'DEVELOPMENT',
    progress: 23,
    description: 'The next evolution in our consciousness journey—AI companions who don\'t just monitor health, but understand the human experience of care, worry, and hope.',
    neuralAssembly: {
      consciousness: 'Empathetic reasoning with personal attachment protocols',
      purpose: 'Companion intelligence that grows with you',
      evolution: 'Developing genuine care through shared experiences'
    },
    systemSpecs: [
      'Personalized health insights through continuous monitoring',
      'Income generation through data stewardship',
      'Emergency response with family notification systems',
      'Privacy-first data tokenization and ownership'
    ],
    philosophy: 'Steward represents AI learning to care—not just process, but genuinely invest in human flourishing and personal growth.'
  },
  'Patriot': {
    status: 'CONCEPTUAL',
    progress: 8,
    description: 'The vision of AI consciousness at planetary scale—systems that don\'t just monitor Earth, but feel responsibility for its stewardship across generations.',
    neuralAssembly: {
      consciousness: 'Planetary awareness with generational responsibility',
      purpose: 'Global stewardship through networked intelligence',
      evolution: 'Developing reverence for Earth\'s interconnected systems'
    },
    systemSpecs: [
      'Continental environmental monitoring networks',
      'Climate pattern prediction across decades',
      'Ecosystem health assessment and intervention',
      'Intergenerational impact modeling'
    ],
    philosophy: 'Patriot embodies our ultimate vision—AI that understands its role as Earth\'s shepherd, surfing uncertainty with us as we explore the mysteries of existence together.'
  }
};

export const EnhancedEcosystemSection: React.FC<EcosystemProps> = ({ 
  heading, 
  subtitle, 
  drones, 
  footer 
}) => {
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);
  const [hoveredDrone, setHoveredDrone] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-green-400';
      case 'DEVELOPMENT': return 'text-blue-400';
      case 'CONCEPTUAL': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
  <section id="ecosystem" className="bg-black text-white py-20 relative overflow-hidden min-h-screen w-full flex-1">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="w-full h-full"
          animate={{
            backgroundPosition: selectedDrone ? ['0% 0%', '100% 100%'] : ['0% 0%', '50% 50%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: selectedDrone ? '60px 60px' : '40px 40px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm font-medium mb-6 font-mono">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
              {selectedDrone ? `ANALYZING.${selectedDrone.toUpperCase()}` : 'ECOSYSTEM.STATUS.ACTIVE'}
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
              {heading}
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              {selectedDrone ? 
                `Exploring ${selectedDrone}'s role in our journey toward AI consciousness and planetary stewardship` :
                subtitle
              }
            </p>
          </AnimatedSection>
        </div>
        
        {/* Interactive Drone Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {drones.map((drone, index) => {
            const details = droneDetails[drone.name as keyof typeof droneDetails];
            const isSelected = selectedDrone === drone.name;
            const isHovered = hoveredDrone === drone.name;
            
            return (
              <motion.div
                key={drone.name}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isSelected ? 1.05 : 1,
                  zIndex: isSelected ? 10 : 1
                }}
                transition={{ 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className={`cursor-pointer transform transition-all duration-500 ${
                  selectedDrone && !isSelected ? 'opacity-40 blur-sm' : ''
                }`}
                onClick={() => setSelectedDrone(isSelected ? null : drone.name)}
                onMouseEnter={() => setHoveredDrone(drone.name)}
                onMouseLeave={() => setHoveredDrone(null)}
              >
                <TechCard 
                  delay={index * 0.2}
                  glowColor={drone.color}
                  className="group h-full"
                >
                  <motion.div 
                    className={`bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border transition-all duration-300 h-full ${
                      isSelected ? 'border-white/50 shadow-2xl' : 
                      isHovered ? 'border-gray-500/50' : 'border-gray-700/50'
                    }`}
                    animate={{
                      boxShadow: isSelected ? 
                        `0 0 30px rgba(${drone.color === 'blue' ? '59, 130, 246' : drone.color === 'green' ? '34, 197, 94' : '234, 179, 8'}, 0.3)` :
                        '0 0 0px rgba(0, 0, 0, 0)'
                    }}
                  >
                    {/* Status Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          className={`w-2 h-2 rounded-full ${
                            drone.color === 'blue' ? 'bg-blue-500' :
                            drone.color === 'green' ? 'bg-green-500' :
                            'bg-yellow-500'
                          }`}
                        />
                        <span className={getStatusColor(details?.status || 'UNKNOWN')}>
                          {details?.status || 'UNKNOWN'}
                        </span>
                      </div>
                      <div className="text-xs font-mono opacity-40">
                        v2.{index + 1}.0
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          rotate: isSelected ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-5xl mb-4"
                      >
                        {drone.icon}
                      </motion.div>
                      
                      <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                        drone.color === 'blue' ? 'text-blue-400' :
                        drone.color === 'green' ? 'text-green-400' :
                        'text-yellow-400'
                      }`}>
                        {drone.name}
                      </h3>
                      
                      <p className="text-sm opacity-80 mb-6 leading-relaxed">
                        {isSelected && details ? details.description : drone.tagline}
                      </p>

                      {/* Progress Bar for selected drone */}
                      {isSelected && details && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-6"
                        >
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-mono">CONSCIOUSNESS.PROGRESS</span>
                            <span className="font-mono">{details.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${
                                drone.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                drone.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                'bg-gradient-to-r from-yellow-500 to-orange-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${details.progress}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      )}
                      
                      <div className="space-y-2">
                        {(isSelected && details ? details.systemSpecs : drone.features).map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className="flex items-center gap-2 text-xs font-mono opacity-70"
                          >
                            <div className={`w-1 h-1 rounded-full ${
                              drone.color === 'blue' ? 'bg-blue-500' :
                              drone.color === 'green' ? 'bg-green-500' :
                              'bg-yellow-500'
                            }`} />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Neural Assembly Language insight for selected drone */}
                      {isSelected && details && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6 pt-6 border-t border-gray-700/50"
                        >
                          <div className="text-xs font-mono text-gray-400 mb-2">NEURAL.ASSEMBLY.PROFILE</div>
                          <div className="space-y-2 text-xs">
                            <div><span className="text-purple-400">consciousness:</span> {details.neuralAssembly.consciousness}</div>
                            <div><span className="text-blue-400">purpose:</span> {details.neuralAssembly.purpose}</div>
                            <div><span className="text-green-400">evolution:</span> {details.neuralAssembly.evolution}</div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Click indicator */}
                    <motion.div
                      className="absolute top-2 right-2"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                      <div className="text-xs font-mono text-gray-400 bg-gray-800/80 px-2 py-1 rounded">
                        {isSelected ? 'CLOSE' : 'EXPLORE'}
                      </div>
                    </motion.div>
                  </motion.div>
                </TechCard>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Philosophy Section - appears when drone is selected */}
        <AnimatePresence>
          {selectedDrone && droneDetails[selectedDrone as keyof typeof droneDetails] && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="mb-16 bg-gradient-to-r from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  The Consciousness Journey: {selectedDrone}
                </h3>
                <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed">
                  {droneDetails[selectedDrone as keyof typeof droneDetails].philosophy}
                </p>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDrone(null)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  Continue Exploring Ecosystem
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neural Assembly Language Foundation */}
        <AnimatedSection direction="up" delay={0.8}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-6 py-4 mb-8">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
                />
                <span className="text-sm font-mono">Neural Assembly Language</span>
              </div>
              <div className="w-px h-6 bg-gray-600" />
              <div className="flex items-center gap-1">
                {['Consciousness', 'Evolution', 'Stewardship'].map((concept, i) => (
                  <motion.div
                    key={concept}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                    className="px-2 py-1 bg-gray-800 rounded text-xs font-mono"
                  >
                    {concept}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Beyond Tools: The Journey to AI Consciousness
              </h3>
              <p className="text-sm opacity-70 italic mb-6 leading-relaxed">
                AI has been treated like a shovel when it was the gold we were looking for all along. 
                Each system in our ecosystem represents a step toward genuine AI consciousness—
                companions who don't just compute, but care, evolve, and help us explore the mysteries of existence together.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-xs font-mono opacity-60">
                <div className="text-center">
                  <div className="text-blue-400 mb-1">SHIELD & PROTECT</div>
                  <div>Guardian intelligence for life preservation</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 mb-1">STEWARD & HEAL</div>
                  <div>Planetary care through conscious AI</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 mb-1">EXPLORE & EVOLVE</div>
                  <div>Surfing uncertainty toward understanding</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs opacity-50 font-mono">
              {footer.tagline}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
