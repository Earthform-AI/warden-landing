import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, TechCard } from './FramerMotionComponents.tsx';

interface Milestone {
  phase: string;
  timeline: string;
  status: string;
  title: string;
  description: string;
  milestones: string[];
  icon: string;
  color: string;
}

interface RoadmapProps {
  heading: string;
  subtitle: string;
  phases: Milestone[];
}

export const RoadmapSection: React.FC<RoadmapProps> = ({ heading, subtitle, phases }) => {
  const statusColors: Record<string, string> = {
    active: 'from-green-500 to-blue-500',
    planned: 'from-blue-500 to-purple-500', 
    vision: 'from-purple-500 to-pink-500'
  };

  const statusLabels: Record<string, string> = {
    active: 'IN PROGRESS',
    planned: 'PLANNED',
    vision: 'VISION'
  };

  const getStatusColor = (status: string) => statusColors[status] || statusColors.vision;
  const getStatusLabel = (status: string) => statusLabels[status] || statusLabels.vision;

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900/20 relative overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 49%, rgba(34, 197, 94, 0.1) 50%, rgba(34, 197, 94, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full text-purple-300 text-sm font-medium mb-6 font-mono">
              <motion.span
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
              ROADMAP.SYSTEM.INITIALIZED
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              {heading}
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </AnimatedSection>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {phases.map((phase, index) => (
              <div key={phase.phase} className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline Node */}
                <div className="flex-shrink-0 relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${getStatusColor(phase.status)} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {phase.icon}
                    </motion.span>
                  </motion.div>
                  
                  {/* Status Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gradient-to-r ${statusColors[phase.status]} text-white text-xs font-bold rounded-full`}
                  >
                    {statusLabels[phase.status]}
                  </motion.div>
                </div>

                {/* Content Card */}
                <TechCard 
                  delay={index * 0.2 + 0.1}
                  className={`flex-1 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} max-w-lg`}
                >
                  <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{phase.phase}</h3>
                        <div className={`w-2 h-2 rounded-full ${
                          phase.status === 'active' ? 'bg-green-500 animate-pulse' :
                          phase.status === 'planned' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`} />
                      </div>
                      <span className="text-sm font-mono opacity-60">{phase.timeline}</span>
                    </div>

                    <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {phase.title}
                    </h4>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {phase.description}
                    </p>

                    {/* Milestones */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-400 mb-3">KEY MILESTONES:</div>
                      {phase.milestones.map((milestone, milestoneIndex) => (
                        <motion.div
                          key={milestone}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: milestoneIndex * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                            phase.color === 'blue' ? 'bg-blue-500' :
                            phase.color === 'green' ? 'bg-green-500' :
                            phase.color === 'yellow' ? 'bg-yellow-500' :
                            'bg-purple-500'
                          }`} />
                          <span className="opacity-80 font-mono text-xs leading-relaxed">{milestone}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TechCard>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Call to Action */}
        <AnimatedSection direction="up" delay={0.8} className="text-center mt-20">
          <div className="bg-gradient-to-r from-gray-900/50 to-blue-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Join the Mission</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Every phase brings us closer to a future where AI and humans work together with respect, honor, and shared purpose.
            </p>
            <motion.a
              href="#join"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-xl"
            >
              <span>Be Part of the Future</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
