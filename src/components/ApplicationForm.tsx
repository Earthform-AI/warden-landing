import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { aiToolsCatalog } from '../config/sponsorship.config';

interface ApplicationFormData {
  name: string;
  email: string;
  background: string;
  contributions: string;
  ai_tools_needed: string[];
  github_url: string;
  portfolio_url: string;
  linkedin_url: string;
}

// Enhanced AI tools options from sponsorship configuration
const AI_TOOLS_OPTIONS = [
  ...Object.keys(aiToolsCatalog),
  'Other (specify in background)'
];

export const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    background: '',
    contributions: '',
    ai_tools_needed: [],
    github_url: '',
    portfolio_url: '',
    linkedin_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToolsChange = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      ai_tools_needed: prev.ai_tools_needed.includes(tool)
        ? prev.ai_tools_needed.filter(t => t !== tool)
        : [...prev.ai_tools_needed, tool]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        className="bg-gradient-to-br from-green-900/20 via-black to-blue-900/20 text-white py-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-full text-green-300 text-sm font-medium mb-6">
            ✓ Application Submitted
          </div>
          
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Thank You for Applying!
          </h2>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
            Your application for AI tools access has been submitted successfully. We'll review your application and notify you via email about the next steps.
          </p>
          
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">What happens next?</h3>
            <ul className="text-left text-gray-300 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">1.</span>
                <span>Our team will review your application and contributions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">2.</span>
                <span>If approved, your profile will be visible to potential sponsors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">3.</span>
                <span>When matched with a sponsor, you'll receive AI tools access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">4.</span>
                <span>You'll provide regular impact updates to your sponsor</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 text-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(139, 69, 255, 0.3) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full text-purple-300 text-sm font-medium mb-6">
            🚀 Apply for AI Tools Access
          </div>
          
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Get AI Tools to Amplify Your Impact
          </h2>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-6">
            Apply for sponsored access to premium AI tools. Perfect for developers, educators, researchers, and creators who are already making a positive impact in their communities.
          </p>
        </div>

        {/* Application Form */}
        <motion.div 
          className="bg-gray-900/30 rounded-2xl p-8 border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Background and Contributions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Background & Current Work *
              </label>
              <textarea
                name="background"
                required
                value={formData.background}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Tell us about your background, current projects, and how you're currently helping others..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Examples of Your Contributions *
              </label>
              <textarea
                name="contributions"
                required
                value={formData.contributions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Share specific examples of how you've helped others - open source contributions, teaching, mentoring, community work, etc."
              />
            </div>

            {/* AI Tools Needed */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                AI Tools You Need *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {AI_TOOLS_OPTIONS.map((tool) => (
                  <label key={tool} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ai_tools_needed.includes(tool)}
                      onChange={() => handleToolsChange(tool)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-gray-300">{tool}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Optional Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Optional Links (helps with verification)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Portfolio/Website
                  </label>
                  <input
                    type="url"
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yoursite.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || formData.ai_tools_needed.length === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting Application...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-8 text-center text-gray-400">
          <p className="text-sm">
            By submitting this application, you agree to provide regular impact updates if sponsored and allow us to share your progress with sponsors.
          </p>
        </div>
      </div>
    </section>
  );
};