import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type Testimonial } from '../src/utils/supabase';

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
        const { data: testimonials, error: getError } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (getError) {
          console.error('Supabase error:', getError);
          res.status(500).json({ error: 'Failed to fetch testimonials' });
          return;
        }
        
        res.status(200).json({
          testimonials: testimonials || [],
          count: testimonials?.length || 0,
          lastUpdated: new Date().toISOString()
        });
        break;

      case 'POST':
        // Submit new testimonial
        const newTestimonial = req.body as Partial<Testimonial>;
        
        // Basic validation
        if (!newTestimonial.name || !newTestimonial.impact) {
          res.status(400).json({ error: 'Name and impact are required' });
          return;
        }

        // Insert testimonial into database
        const { data, error: insertError } = await supabase
          .from('testimonials')
          .insert({
            name: newTestimonial.name,
            role: newTestimonial.role || '',
            organization: newTestimonial.organization,
            tools: newTestimonial.tools || [],
            impact: newTestimonial.impact,
            metrics: newTestimonial.metrics || {},
            verification: newTestimonial.verification || {
              status: 'pending',
              method: 'documentation',
              verifiedBy: 'system',
            },
            consent: {
              publicUse: true,
              contactable: false,
              updatesConsent: false,
              ...newTestimonial.consent
            }
          })
          .select()
          .single();

        if (insertError) {
          console.error('Supabase error:', insertError);
          res.status(500).json({ error: 'Failed to create testimonial' });
          return;
        }
        
        res.status(201).json({
          message: 'Testimonial submitted successfully',
          id: data.id,
          status: 'created'
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