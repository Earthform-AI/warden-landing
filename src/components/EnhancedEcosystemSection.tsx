import React from 'react';
import { motion } from 'framer-motion';
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

export const EnhancedEcosystemSection: React.FC<EcosystemProps> = ({ 
  heading, 
  subtitle, 
  drones, 
  footer 
}) => {
  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
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
              ECOSYSTEM.STATUS.ACTIVE
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
              {heading}
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </AnimatedSection>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {drones.map((drone, index) => (
            <TechCard 
              key={drone.name}
              delay={index * 0.2}
              glowColor={drone.color}
              className="group"
            >
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-300 h-full">
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
                    <span>ONLINE</span>
                  </div>
                  <div className="text-xs font-mono opacity-40">
                    v2.{index + 1}.0
                  </div>
                </div>

                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl mb-4"
                  >
                    {drone.icon}
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold mb-3 ${
                    drone.color === 'blue' ? 'text-blue-400' :
                    drone.color === 'green' ? 'text-green-400' :
                    'text-yellow-400'
                  }`}>
                    {drone.name}
                  </h3>
                  
                  <p className="text-sm opacity-80 mb-6 leading-relaxed">
                    {drone.tagline}
                  </p>
                  
                  <div className="space-y-2">
                    {drone.features.map((feature, featureIndex) => (
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
                </div>

                {/* Connection Lines (visible on hover) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {index < drones.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-600 to-transparent" />
                  )}
                </motion.div>
              </div>
            </TechCard>
          ))}
        </div>

        {/* System Architecture Visualization */}
        <AnimatedSection direction="up" delay={0.8}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-6 py-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                />
                <span className="text-sm font-mono">EarthformOS</span>
              </div>
              <div className="w-px h-6 bg-gray-600" />
              <div className="flex items-center gap-1">
                {['Neural', 'Cloud', 'Edge'].map((tech, i) => (
                  <motion.div
                    key={tech}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                    className="px-2 py-1 bg-gray-800 rounded text-xs font-mono"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm opacity-60 italic mb-4 max-w-2xl mx-auto">
              {footer.description}
            </p>
            <p className="text-xs opacity-50 font-mono">
              {footer.tagline}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
