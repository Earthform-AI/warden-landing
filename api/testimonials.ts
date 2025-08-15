import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type ImpactReport } from '../src/utils/supabase';
import type { RealTestimonial } from '../src/config/testimonials.config';

// Enhanced API endpoint for managing real testimonials with Supabase integration

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Return verified testimonials for public display
        const { data: testimonials, error: fetchError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('verification->>status', 'verified')
          .eq('consent->>publicUse', true)
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Supabase fetch error:', fetchError);
          res.status(500).json({ error: 'Failed to fetch testimonials' });
          return;
        }
        
        res.status(200).json({
          testimonials,
          count: testimonials.length,
          lastUpdated: new Date().toISOString()
        });
        break;

      case 'POST':
        // Submit new testimonial for verification
        const newTestimonial = req.body as Partial<RealTestimonial>;
        
        // Enhanced validation
        if (!newTestimonial.name || !newTestimonial.impact || !newTestimonial.tools?.length) {
          res.status(400).json({ 
            error: 'Name, impact, and tools are required',
            required: ['name', 'impact', 'tools']
          });
          return;
        }

        // Prepare testimonial data for database insertion
        const testimonialData = {
          name: newTestimonial.name,
          role: newTestimonial.role || '',
          organization: newTestimonial.organization,
          tools: newTestimonial.tools,
          impact: newTestimonial.impact,
          metrics: newTestimonial.metrics || {},
          verification: {
            status: 'pending',
            method: 'documentation',
            verifiedBy: 'system',
            verifiedDate: null
          },
          consent: {
            publicUse: newTestimonial.consent?.publicUse ?? false,
            contactable: newTestimonial.consent?.contactable ?? false,
            updatesConsent: newTestimonial.consent?.updatesConsent ?? false
          }
        };

        const { data: insertedTestimonial, error: insertError } = await supabase
          .from('testimonials')
          .insert(testimonialData)
          .select()
          .single();

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          res.status(500).json({ error: 'Failed to submit testimonial' });
          return;
        }
        
        res.status(201).json({
          message: 'Testimonial submitted for review',
          id: insertedTestimonial.id,
          status: 'pending'
        });
        break;

      case 'PUT':
        // Update testimonial verification status (admin only)
        const { id, verification } = req.body;
        
        if (!id || !verification) {
          res.status(400).json({ error: 'ID and verification data required' });
          return;
        }

        const { data: updatedTestimonial, error: updateError } = await supabase
          .from('testimonials')
          .update({ 
            verification,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (updateError) {
          console.error('Supabase update error:', updateError);
          res.status(500).json({ error: 'Failed to update testimonial' });
          return;
        }

        res.status(200).json({
          message: 'Testimonial updated successfully',
          testimonial: updatedTestimonial
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}