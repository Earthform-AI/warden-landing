import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Applicant, Sponsor } from '../utils/supabase';

interface SponsorDashboardProps {
  sponsorEmail?: string;
}

interface ExtendedApplicant extends Applicant {
  isSelected?: boolean;
}

const TIER_CONFIGS = {
  'AI Starter': { maxApplicants: 1, monthlyAmount: 29 },
  'AI Amplifier': { maxApplicants: 2, monthlyAmount: 89 },
  'AI Ecosystem': { maxApplicants: 5, monthlyAmount: 199 }
};

export const SponsorDashboard: React.FC<SponsorDashboardProps> = ({ sponsorEmail }) => {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [availableApplicants, setAvailableApplicants] = useState<ExtendedApplicant[]>([]);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (sponsorEmail) {
      loadSponsorData();
      loadApplicants();
    }
  }, [sponsorEmail]);

  const loadSponsorData = async () => {
    try {
      const response = await fetch(`/api/sponsors?email=${encodeURIComponent(sponsorEmail!)}`);
      if (response.ok) {
        const data = await response.json();
        setSponsor(data.sponsor);
      }
    } catch (error) {
      console.error('Failed to load sponsor data:', error);
    }
  };

  const loadApplicants = async () => {
    try {
      const response = await fetch('/api/applicants?status=approved');
      if (response.ok) {
        const data = await response.json();
        setAvailableApplicants(data.applicants);
      }
    } catch (error) {
      console.error('Failed to load applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicantSelect = (applicantId: string) => {
    const maxApplicants = sponsor ? TIER_CONFIGS[sponsor.tier as keyof typeof TIER_CONFIGS]?.maxApplicants || 1 : 1;
    
    if (selectedApplicants.includes(applicantId)) {
      setSelectedApplicants(prev => prev.filter(id => id !== applicantId));
    } else if (selectedApplicants.length < maxApplicants) {
      setSelectedApplicants(prev => [...prev, applicantId]);
    }
  };

  const handleSponsorshipSubmit = async () => {
    if (!sponsor || selectedApplicants.length === 0) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const tierConfig = TIER_CONFIGS[sponsor.tier as keyof typeof TIER_CONFIGS];
      const monthlyAmountPerApplicant = tierConfig.monthlyAmount / selectedApplicants.length;

      const sponsorshipPromises = selectedApplicants.map(applicantId => {
        const applicant = availableApplicants.find(a => a.id === applicantId);
        return fetch('/api/sponsorships', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sponsor_email: sponsorEmail,
            applicant_id: applicantId,
            ai_tools_provided: applicant?.ai_tools_needed || [],
            monthly_amount: monthlyAmountPerApplicant
          })
        });
      });

      const results = await Promise.all(sponsorshipPromises);
      const failedSponsorships = results.filter(r => !r.ok);

      if (failedSponsorships.length === 0) {
        setSuccess(`Successfully sponsored ${selectedApplicants.length} applicant${selectedApplicants.length > 1 ? 's' : ''}!`);
        setSelectedApplicants([]);
        // Reload data to reflect changes
        loadSponsorData();
        loadApplicants();
      } else {
        throw new Error(`Failed to create ${failedSponsorships.length} sponsorship(s)`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create sponsorships');
    } finally {
      setSubmitting(false);
    }
  };

  if (!sponsorEmail) {
    return (
      <div className="bg-gray-900/30 rounded-2xl p-8 border border-red-500/20 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-red-300">Authentication Required</h3>
        <p className="text-gray-300">Please log in to access your sponsor dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900/30 rounded-2xl p-8 border border-blue-500/20 max-w-4xl mx-auto text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading your sponsor dashboard...</p>
      </div>
    );
  }

  const tierConfig = sponsor ? TIER_CONFIGS[sponsor.tier as keyof typeof TIER_CONFIGS] : null;
  const remainingSlots = tierConfig ? tierConfig.maxApplicants - (sponsor?.sponsored_applicants.length || 0) : 0;

  return (
    <section className="bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 text-white py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            🤝 Sponsor Dashboard
          </div>
          
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Select Applicants to Sponsor
          </h2>

          {sponsor && (
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/20 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Your Sponsorship Tier: {sponsor.tier}</h3>
              <p className="text-gray-300 mb-2">Monthly Commitment: ${sponsor.monthly_commitment}</p>
              <p className="text-gray-300">
                Currently Sponsoring: {sponsor.sponsored_applicants.length} applicant{sponsor.sponsored_applicants.length !== 1 ? 's' : ''}
              </p>
              <p className="text-gray-300">
                Available Slots: {remainingSlots}
              </p>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <motion.div 
            className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 mb-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-green-300">{success}</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {remainingSlots === 0 ? (
          <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-6 max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">No Available Slots</h3>
            <p className="text-gray-300">
              You have reached your sponsorship limit for your current tier. To sponsor more applicants, consider upgrading your tier.
            </p>
          </div>
        ) : (
          <>
            {/* Selection Summary */}
            {selectedApplicants.length > 0 && (
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-purple-300">
                  Selected Applicants ({selectedApplicants.length})
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">
                    Monthly cost per applicant: ${tierConfig ? (tierConfig.monthlyAmount / Math.max(selectedApplicants.length, 1)).toFixed(2) : '0'}
                  </p>
                  <button
                    onClick={handleSponsorshipSubmit}
                    disabled={submitting}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {submitting ? 'Creating Sponsorships...' : `Sponsor ${selectedApplicants.length} Applicant${selectedApplicants.length > 1 ? 's' : ''}`}
                  </button>
                </div>
              </div>
            )}

            {/* Available Applicants */}
            <div className="grid md:grid-cols-2 gap-6">
              {availableApplicants.map((applicant) => (
                <motion.div
                  key={applicant.id}
                  className={`bg-gray-900/30 rounded-xl p-6 border transition-all duration-200 cursor-pointer ${
                    selectedApplicants.includes(applicant.id)
                      ? 'border-purple-500/50 bg-purple-900/20'
                      : 'border-gray-600/30 hover:border-blue-500/30'
                  }`}
                  onClick={() => handleApplicantSelect(applicant.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-300">{applicant.name}</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedApplicants.includes(applicant.id)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedApplicants.includes(applicant.id) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {applicant.profile.background}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Contributions:</h4>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {applicant.profile.contributions}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">AI Tools Needed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {applicant.ai_tools_needed.map((tool) => (
                        <span 
                          key={tool}
                          className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {applicant.profile.github_url && (
                    <a
                      href={applicant.profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View GitHub →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {availableApplicants.length === 0 && (
              <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-600/30 text-center">
                <h3 className="text-lg font-semibold mb-2 text-gray-400">No Applicants Available</h3>
                <p className="text-gray-500">There are no approved applicants available for sponsorship at this time.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};