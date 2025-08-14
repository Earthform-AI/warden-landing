import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonialsConfig, getDisplayTestimonials, placeholderTestimonials, type RealTestimonial } from '../config/testimonials.config';

interface EnhancedTestimonialsProps {
  maxDisplay?: number;
  showFallback?: boolean;
}

export const EnhancedTestimonials: React.FC<EnhancedTestimonialsProps> = ({ 
  maxDisplay = 3, 
  showFallback = true 
}) => {
  const [testimonials, setTestimonials] = useState<RealTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realTestimonialsCount, setRealTestimonialsCount] = useState(0);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      // Fetch real testimonials from API
      let realTestimonials: RealTestimonial[] = [];
      
      try {
        const response = await fetch('/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          realTestimonials = data.testimonials || [];
          setRealTestimonialsCount(realTestimonials.length);
        }
      } catch (apiError) {
        console.log('API not available, using configuration-based display');
      }

      // Get testimonials to display based on configuration
      const displayTestimonials = await getDisplayTestimonials(realTestimonials);
      setTestimonials(displayTestimonials.slice(0, maxDisplay));
    } catch (err) {
      setError('Failed to load testimonials');
      console.error('Testimonials loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Show coming soon message if configured
  if (testimonialsConfig.displayMode === 'coming-soon' && showFallback) {
    return <ComingSoonTestimonials />;
  }

  // Show loading state
  if (loading) {
    return <TestimonialsLoadingSkeleton />;
  }

  // Show error state
  if (error) {
    return <TestimonialsErrorState error={error} />;
  }

  // Show testimonials
  return (
    <div className="space-y-6">
      {/* Header with status indicator */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Impact Stories</h3>
          <p className="text-gray-400">
            {realTestimonialsCount > 0 ? 'Verified impact reports' : 'Representative examples'}
          </p>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            realTestimonialsCount >= testimonialsConfig.minimumRealTestimonials 
              ? 'bg-green-400' 
              : 'bg-yellow-400'
          }`} />
          <span className="text-sm text-gray-400">
            {realTestimonialsCount >= testimonialsConfig.minimumRealTestimonials 
              ? 'Real Data' 
              : 'Demo Mode'
            }
          </span>
        </div>
      </div>

      {/* Testimonials grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border ${
              testimonial.isPlaceholder 
                ? 'border-yellow-500/20 bg-yellow-900/10' 
                : 'border-green-500/20 bg-green-900/10'
            }`}
          >
            {/* Verification badge */}
            {testimonial.isPlaceholder && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-900/30 rounded-full text-yellow-300 text-xs font-medium mb-3">
                ⚠️ Example Story
              </div>
            )}
            
            {testimonial.verified && !testimonial.isPlaceholder && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-900/30 rounded-full text-green-300 text-xs font-medium mb-3">
                ✓ Verified Impact
              </div>
            )}

            {/* Testimonial content */}
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h4 className="font-semibold text-white mb-1">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">
                  {testimonial.role}
                  {testimonial.organization && ` at ${testimonial.organization}`}
                </p>
              </div>

              {/* Tools used */}
              <div className="flex flex-wrap gap-1">
                {testimonial.tools.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Impact story */}
              <p className="text-gray-300 leading-relaxed text-sm">
                {testimonial.impact}
              </p>

              {/* Metrics */}
              {testimonial.metrics && (
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700/50">
                  {testimonial.metrics.projects_completed && (
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-300">
                        {testimonial.metrics.projects_completed}
                      </div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                  )}
                  
                  {testimonial.metrics.reachNumbers && (
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-300">
                        {testimonial.metrics.reachNumbers.toLocaleString()}+
                      </div>
                      <div className="text-xs text-gray-400">Reach</div>
                    </div>
                  )}
                </div>
              )}

              {/* Date */}
              <div className="text-xs text-gray-500 pt-2">
                {new Date(testimonial.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note for placeholder content */}
      {testimonials.some(t => t.isPlaceholder) && (
        <div className="text-center mt-8 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
          <p className="text-yellow-300 text-sm">
            <strong>Note:</strong> Example stories shown above represent the type of impact we expect to see. 
            Real verified testimonials are being collected and will replace these examples in early 2025.
          </p>
          <p className="text-yellow-300/80 text-xs mt-2">
            Want to be notified when real impact stories are available? 
            <a href="#join" className="underline ml-1">Join our community</a>
          </p>
        </div>
      )}
    </div>
  );
};

// Coming soon component
const ComingSoonTestimonials: React.FC = () => (
  <motion.div 
    className="text-center py-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm font-medium mb-6">
        🔄 Real Stories In Progress
      </div>
      
      <h3 className="text-3xl font-bold mb-4 text-white">
        {testimonialsConfig.fallbackMessage.title}
      </h3>
      
      <p className="text-xl text-gray-300 mb-6">
        {testimonialsConfig.fallbackMessage.subtitle}
      </p>
      
      <p className="text-gray-400 leading-relaxed mb-8">
        {testimonialsConfig.fallbackMessage.description}
      </p>
      
      <div className="space-y-4">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
          {testimonialsConfig.fallbackMessage.cta}
        </button>
        
        <p className="text-sm text-gray-500">
          {testimonialsConfig.fallbackMessage.timeline}
        </p>
      </div>
    </div>
  </motion.div>
);

// Loading skeleton
const TestimonialsLoadingSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gray-900/50 p-6 rounded-xl animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-700 rounded-full w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Error state
const TestimonialsErrorState: React.FC<{ error: string }> = ({ error }) => (
  <div className="text-center py-8">
    <div className="text-red-400 mb-4">⚠️ Unable to load testimonials</div>
    <p className="text-gray-400 text-sm">{error}</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);