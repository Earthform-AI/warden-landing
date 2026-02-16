import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, TechButton } from './FramerMotionComponents.tsx';
import { trackFormSubmission } from '../utils/analytics.ts';

interface CTAFormProps {
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitText: string;
  action: string;
}

interface CTAProps {
  heading: string;
  subtitle: string;
  form: CTAFormProps;
  embedded?: boolean;
}

export const EnhancedCTASection: React.FC<CTAProps> = ({ heading, subtitle, form, embedded = false }) => {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formEl = event.currentTarget;
    const email = (formEl.email as HTMLInputElement).value.trim();
    const message = (formEl.message as HTMLTextAreaElement).value.trim();

    trackFormSubmission('cta_contact', {
      form_location: 'homepage_cta',
      has_message: !!message
    });

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      if (res.ok) {
        setStatus('success');
        formEl.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  // Embedded mode: render just the form, no section wrapper or decorations
  if (embedded) {
    return (
      <form 
        action={form.action} 
        method="POST" 
        onSubmit={handleFormSubmit}
        className="space-y-4"
      >
        {status === 'success' && (
          <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-3 text-green-200 text-center text-sm">
            ✓ You're on the list. We'll be in touch.
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-3 text-red-200 text-center text-sm">
            {errorMsg}
          </div>
        )}
        <input 
          type="email" 
          name="email" 
          placeholder={form.emailPlaceholder}
          required 
          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
        />
        <textarea 
          name="message" 
          placeholder={form.messagePlaceholder}
          rows={3}
          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm"
        />
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="w-full py-3 text-sm font-bold rounded-lg bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent ✓' : form.submitText}
        </button>
      </form>
    );
  }

  return (
    <section id="join" className="py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900/20 relative overflow-hidden scroll-snap-section min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 49%, rgba(34, 197, 94, 0.1) 50%, rgba(34, 197, 94, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative w-full">
        <div className="text-center mb-16">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-full text-green-300 text-sm font-medium mb-6 font-mono">
              <motion.span
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                🛡️
              </motion.span>
              <span className="tracking-wide">JOIN.THE.MISSION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent leading-tight tracking-wide">
              {heading}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-normal">
              {subtitle}
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection direction="up" delay={0.3}>
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-lg blur opacity-75 hover:opacity-100 transition duration-1000"></div>
              
              <form 
                action={form.action} 
                method="POST" 
                onSubmit={handleFormSubmit}
                className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 space-y-6"
              >
                {status === 'success' && (
                  <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-4 text-green-200 text-center">
                    ✓ You're on the list. We'll be in touch when we publish.
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 text-red-200 text-center">
                    {errorMsg}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder={form.emailPlaceholder}
                      required 
                      className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <textarea 
                      name="message" 
                      placeholder={form.messagePlaceholder}
                      rows={4}
                      className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                <TechButton
                  type="submit"
                  variant="primary"
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white transition-all duration-300 hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>{status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent ✓' : form.submitText}</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </TechButton>
              </form>
            </div>
          </div>
        </AnimatedSection>

        {/* Community Stats */}
        <AnimatedSection direction="up" delay={0.6}>
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-blue-400">Day 1</div>
              <div className="text-sm text-gray-300">Growing Community</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="text-sm text-gray-300">Mission Active</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-gray-300">Lives to Save</div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Final Call to Action */}
        <AnimatedSection direction="up" delay={0.8}>
          <div className="text-center mt-16 pt-12 border-t border-gray-700/30">
            <p className="text-lg italic text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Every great mission begins with a single voice saying 'I believe in this future.'"
            </p>
            <p className="text-sm text-gray-400 mt-4">— The Earthform Team</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
