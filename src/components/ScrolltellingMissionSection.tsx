import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './FramerMotionComponents';

interface MissionStory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

interface ScrolltellingMissionSectionProps {
  stories: MissionStory[];
}

export const defaultMissionStories: MissionStory[] = [
  {
    id: 'problem',
    title: 'The Underground Reality',
    subtitle: 'Every 15 minutes, a mining accident occurs somewhere in the world',
    description: 'Despite decades of safety improvements, mining remains one of the most dangerous professions. Workers face cave-ins, gas explosions, equipment failures, and countless unseen hazards that current technology cannot predict or prevent.',
    icon: '⚠️',
    gradient: 'from-red-500 to-orange-500',
    stats: [
      { label: 'Mining Deaths Annually', value: '2,000+' },
      { label: 'Injuries Per Year', value: '50,000+' },
      { label: 'Near Misses Daily', value: '1,000+' }
    ]
  },
  {
    id: 'vision',
    title: 'A Guardian That Never Sleeps',
    subtitle: 'AI-powered protection that monitors every breath, every vibration, every change',
    description: 'Warden drones patrol underground tunnels 24/7, using advanced sensors and predictive AI to detect hazards before they become deadly. They communicate with miners, coordinate emergency responses, and learn from every situation to become smarter guardians.',
    icon: '🛡️',
    gradient: 'from-blue-500 to-cyan-500',
    stats: [
      { label: 'Hazard Detection', value: '99.7%' },
      { label: 'Response Time', value: '<30s' },
      { label: 'Lives Protected', value: '∞' }
    ]
  },
  {
    id: 'technology',
    title: 'Neural Assembly Language',
    subtitle: 'The first programming language designed for AI consciousness',
    description: 'Traditional code cannot capture the nuanced decision-making required for life-and-death situations. Neural Assembly Language allows AI systems to understand context, weigh moral implications, and make split-second decisions that prioritize human life above all else.',
    icon: '🧠',
    gradient: 'from-purple-500 to-pink-500',
    stats: [
      { label: 'Decision Speed', value: '0.001s' },
      { label: 'Context Variables', value: '10,000+' },
      { label: 'Moral Weight', value: '100%' }
    ]
  },
  {
    id: 'impact',
    title: 'Beyond the Mine',
    subtitle: 'A foundation for planetary AI stewardship',
    description: 'The technology protecting miners today becomes the guardian system for all humanity tomorrow. From personal health companions to environmental monitoring networks, Warden is the first step toward AI systems that truly serve and protect human flourishing.',
    icon: '🌍',
    gradient: 'from-green-500 to-emerald-500',
    stats: [
      { label: 'Applications', value: 'Unlimited' },
      { label: 'Human Focus', value: '100%' },
      { label: 'Future Impact', value: 'Immeasurable' }
    ]
  }
];

const StoryCard: React.FC<{ story: MissionStory; isActive: boolean }> = ({ story, isActive }) => {
  return (
    <div className="max-w-4xl mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {/* Icon */}
        <motion.div
          className="text-8xl mb-8"
          animate={{ 
            rotate: isActive ? [0, 5, -5, 0] : 0,
            scale: isActive ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        >
          {story.icon}
        </motion.div>

        {/* Title */}
        <motion.h2
          className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent leading-tight tracking-wide`}
          animate={{ opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {story.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.h3
          className="text-2xl md:text-3xl text-gray-300 mb-8 font-light tracking-normal"
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {story.subtitle}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 tracking-normal"
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {story.description}
        </motion.p>

        {/* Stats */}
        {story.stats && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {story.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`text-3xl font-bold bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const ScrolltellingMissionSection: React.FC<ScrolltellingMissionSectionProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);
  
  // Auto-advance stories every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((current) => (current + 1) % stories.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [stories.length]);

  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black h-full py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
              radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStoryIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full"
          >
            <StoryCard 
              story={stories[currentStoryIndex]} 
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex gap-3">
          {stories.map((story, index) => (
            <motion.button
              key={story.id}
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                currentStoryIndex === index
                  ? 'bg-white border-white scale-125'
                  : 'bg-transparent border-gray-500 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentStoryIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStoryIndex + 1) / stories.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </section>
  );
};

export default ScrolltellingMissionSection;
