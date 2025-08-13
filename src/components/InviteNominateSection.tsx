import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { inviteNominate } from '../site.config';

interface FormData {
  [key: string]: string;
}

export const InviteNominateSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nominate' | 'sponsor' | 'impact'>('nominate');
  const [nominateForm, setNominateForm] = useState<FormData>({});
  const [sponsorForm, setSponsorForm] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent, formType: 'nominate' | 'sponsor') => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = formType === 'nominate' ? nominateForm : sponsorForm;
    const config = inviteNominate.forms[formType];
    
    try {
      const response = await fetch(config.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Warden ${formType === 'nominate' ? 'Nomination' : 'Sponsorship'} Form`,
        }),
      });
      
      if (response.ok) {
        window.location.href = '/thanks';
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateForm = (formType: 'nominate' | 'sponsor', field: string, value: string) => {
    if (formType === 'nominate') {
      setNominateForm(prev => ({ ...prev, [field]: value }));
    } else {
      setSponsorForm(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <section id="invite-nominate" className="bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 text-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(139, 69, 255, 0.3) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full text-purple-300 text-sm font-medium mb-6">
            🎯 Community Program
          </div>
          
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            {inviteNominate.heading}
          </h2>
          
          <p className="text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-6 font-medium">
            {inviteNominate.tagline}
          </p>
          
          <p className="text-lg opacity-80 max-w-3xl mx-auto leading-relaxed mb-8">
            {inviteNominate.subtitle}
          </p>
          
          <p className="text-base opacity-70 max-w-4xl mx-auto leading-relaxed">
            {inviteNominate.description}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-xl font-bold mb-4 text-purple-300">{inviteNominate.mission.title}</h3>
            <p className="text-gray-300 leading-relaxed">{inviteNominate.mission.content}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-900/50 rounded-xl p-2 backdrop-blur-sm border border-gray-700/50">
            {Object.entries(inviteNominate.sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as 'nominate' | 'sponsor' | 'impact')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[600px]"
        >
          {activeTab === 'nominate' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Info Panel */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">
                    {inviteNominate.sections.nominate.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {inviteNominate.sections.nominate.description}
                  </p>
                  <ul className="space-y-3">
                    {inviteNominate.sections.nominate.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-400 text-lg">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nomination Form */}
                <div className="bg-gray-900/30 rounded-xl p-6 border border-purple-500/20">
                  <form onSubmit={(e) => handleFormSubmit(e, 'nominate')} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={inviteNominate.forms.nominate.fields.nominatorName}
                        value={nominateForm.nominatorName || ''}
                        onChange={(e) => updateForm('nominate', 'nominatorName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="email"
                        placeholder={inviteNominate.forms.nominate.fields.nominatorEmail}
                        value={nominateForm.nominatorEmail || ''}
                        onChange={(e) => updateForm('nominate', 'nominatorEmail', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={inviteNominate.forms.nominate.fields.nomineeName}
                        value={nominateForm.nomineeName || ''}
                        onChange={(e) => updateForm('nominate', 'nomineeName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="email"
                        placeholder={inviteNominate.forms.nominate.fields.nomineeEmail}
                        value={nominateForm.nomineeEmail || ''}
                        onChange={(e) => updateForm('nominate', 'nomineeEmail', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <textarea
                      placeholder={inviteNominate.forms.nominate.fields.background}
                      value={nominateForm.background || ''}
                      onChange={(e) => updateForm('nominate', 'background', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      required
                    />
                    <textarea
                      placeholder={inviteNominate.forms.nominate.fields.examples}
                      value={nominateForm.examples || ''}
                      onChange={(e) => updateForm('nominate', 'examples', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      required
                    />
                    <textarea
                      placeholder={inviteNominate.forms.nominate.fields.aiHelp}
                      value={nominateForm.aiHelp || ''}
                      onChange={(e) => updateForm('nominate', 'aiHelp', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder={inviteNominate.forms.nominate.fields.relationship}
                      value={nominateForm.relationship || ''}
                      onChange={(e) => updateForm('nominate', 'relationship', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : inviteNominate.forms.nominate.submitText}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sponsor' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Info Panel */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-300">
                    {inviteNominate.sections.sponsor.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {inviteNominate.sections.sponsor.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {inviteNominate.sections.sponsor.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-400 text-lg">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Sponsorship Tiers */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Sponsorship Tiers</h4>
                    {inviteNominate.forms.sponsor.tiers.map((tier, index) => (
                      <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-blue-300">{tier.name}</span>
                          <span className="text-lg font-bold text-white">{tier.amount}</span>
                        </div>
                        <p className="text-sm text-gray-400">{tier.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsor Form */}
                <div className="bg-gray-900/30 rounded-xl p-6 border border-blue-500/20">
                  <form onSubmit={(e) => handleFormSubmit(e, 'sponsor')} className="space-y-4">
                    <input
                      type="text"
                      placeholder={inviteNominate.forms.sponsor.fields.name}
                      value={sponsorForm.name || ''}
                      onChange={(e) => updateForm('sponsor', 'name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      placeholder={inviteNominate.forms.sponsor.fields.email}
                      value={sponsorForm.email || ''}
                      onChange={(e) => updateForm('sponsor', 'email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder={inviteNominate.forms.sponsor.fields.organization}
                      value={sponsorForm.organization || ''}
                      onChange={(e) => updateForm('sponsor', 'organization', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={sponsorForm.tier || ''}
                      onChange={(e) => updateForm('sponsor', 'tier', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Sponsorship Tier</option>
                      {inviteNominate.forms.sponsor.tiers.map((tier, index) => (
                        <option key={index} value={tier.name}>{tier.name} - {tier.amount}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder={inviteNominate.forms.sponsor.fields.commitment}
                      value={sponsorForm.commitment || ''}
                      onChange={(e) => updateForm('sponsor', 'commitment', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <textarea
                      placeholder={inviteNominate.forms.sponsor.fields.motivation}
                      value={sponsorForm.motivation || ''}
                      onChange={(e) => updateForm('sponsor', 'motivation', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : inviteNominate.forms.sponsor.submitText}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4 text-green-300">
                  {inviteNominate.sections.impact.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                  {inviteNominate.sections.impact.description}
                </p>
              </div>

              {/* Impact Showcase Header */}
              <div className="text-center mb-12">
                <h4 className="text-xl font-semibold mb-2 text-green-400">
                  {inviteNominate.showcase.heading}
                </h4>
                <p className="text-gray-400">
                  {inviteNominate.showcase.subtitle}
                </p>
              </div>

              {/* Impact Stories Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {inviteNominate.showcase.stories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5 className="font-bold text-white mb-1">{story.name}</h5>
                        <p className="text-sm text-green-300">{story.role}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{story.date}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-blue-300 font-medium mb-2">Tools Provided:</p>
                      <p className="text-sm text-gray-300">{story.tools}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-green-300 font-medium mb-2">Impact:</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{story.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <p className="text-gray-400 mb-6">
                  Want to see your impact story here? Join the program as a recipient or sponsor.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setActiveTab('nominate')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Nominate Someone
                  </button>
                  <button
                    onClick={() => setActiveTab('sponsor')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Become a Sponsor
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};