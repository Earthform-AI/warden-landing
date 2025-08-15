import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { RealTestimonial } from '../config/testimonials.config';

interface TestimonialSubmissionProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const TestimonialSubmissionForm: React.FC<TestimonialSubmissionProps> = ({
  onSuccess,
  onError
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    organization: '',
    tools: [] as string[],
    impact: '',
    quantifiedImpact: '',
    reachNumbers: '',
    timeframe: '',
    projectsCompleted: '',
    productivityIncrease: '',
    publicUse: true,
    contactable: false,
    updatesConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableTools = [
    'ChatGPT Plus', 'GitHub Copilot', 'Claude Pro', 'Cursor Pro', 
    'Perplexity Pro', 'Midjourney', 'Other AI Tools'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare testimonial data
      const testimonialData: Partial<RealTestimonial> = {
        name: formData.name,
        role: formData.role,
        organization: formData.organization || undefined,
        tools: formData.tools,
        impact: formData.impact,
        metrics: {
          quantifiedImpact: formData.quantifiedImpact,
          reachNumbers: parseInt(formData.reachNumbers) || 0,
          timeframe: formData.timeframe,
          projects_completed: parseInt(formData.projectsCompleted) || undefined,
          productivity_increase: formData.productivityIncrease || undefined
        },
        consent: {
          publicUse: formData.publicUse,
          contactable: formData.contactable,
          updatesConsent: formData.updatesConsent
        }
      };

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit testimonial');
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      if (onError) onError(errorMessage);
      console.error('Testimonial submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-full text-green-300 text-sm font-medium mb-6">
          ✓ Testimonial Submitted
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">
          Thank You for Sharing Your Impact!
        </h3>
        
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Your testimonial has been submitted for verification. We'll review your impact story and may reach out for additional details. Once verified, it will be featured in our impact showcase.
        </p>
        
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-blue-300 mb-3">What's Next?</h4>
          <ul className="text-left text-gray-400 space-y-2">
            <li>• Our team will verify your testimonial within 5-7 business days</li>
            <li>• We may contact you for additional documentation or clarification</li>
            <li>• Once verified, your story will appear in our public impact showcase</li>
            <li>• You'll receive updates if you opted in to communications</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your AI Impact Story
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Help us build authentic testimonials by sharing how AI tools have amplified your positive impact. Your story will be verified before publication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="e.g. Open Source Developer, Educator, Researcher"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Organization (Optional)
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Company, nonprofit, or project name"
            />
          </div>

          {/* AI Tools Used */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              AI Tools You've Used *
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {availableTools.map((tool) => (
                <label key={tool} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tools.includes(tool)}
                    onChange={() => handleToolToggle(tool)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300">{tool}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Impact Story */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Your Impact Story *
            </label>
            <textarea
              name="impact"
              value={formData.impact}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-vertical"
              placeholder="Describe how AI tools helped amplify your positive impact. Be specific about projects, outcomes, and people reached."
            />
          </div>

          {/* Quantified Impact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Impact Metrics (Optional but Recommended)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Quantified Impact
                </label>
                <input
                  type="text"
                  name="quantifiedImpact"
                  value={formData.quantifiedImpact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="e.g. '10,000 students reached', '5 research papers'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  People Reached (Number)
                </label>
                <input
                  type="number"
                  name="reachNumbers"
                  value={formData.reachNumbers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Number of people impacted"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Timeframe
                </label>
                <input
                  type="text"
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="e.g. '6 months', '1 year'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Productivity Increase
                </label>
                <input
                  type="text"
                  name="productivityIncrease"
                  value={formData.productivityIncrease}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="e.g. '200%', '3x faster'"
                />
              </div>
            </div>
          </div>

          {/* Consent and Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Privacy & Consent</h3>
            
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="publicUse"
                checked={formData.publicUse}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
              />
              <span className="text-gray-300">
                I consent to my testimonial being used publicly on the Warden website and marketing materials
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="contactable"
                checked={formData.contactable}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
              />
              <span className="text-gray-300">
                I'm open to being contacted for additional verification or follow-up stories
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="updatesConsent"
                checked={formData.updatesConsent}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
              />
              <span className="text-gray-300">
                I'd like to receive updates about the AI sponsorship program
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6 border-t border-gray-700/50">
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.role || !formData.impact || formData.tools.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
            </button>
            
            <p className="text-sm text-gray-400 mt-4">
              Your testimonial will be reviewed and verified before publication
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};