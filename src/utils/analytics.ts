/**
 * Analytics utilities for tracking user interactions with Vercel Analytics
 */

// Vercel Analytics track function (available globally after Analytics component loads)
declare global {
  interface Window {
    va?: {
      track: (name: string, properties?: Record<string, any>) => void;
    };
  }
}

/**
 * Track custom events with Vercel Analytics
 * @param eventName - Name of the event to track
 * @param properties - Optional event properties
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  try {
    // Use Vercel Analytics if available
    if (typeof window !== 'undefined' && window.va) {
      window.va.track(eventName, properties);
    }
    
    // Fallback: log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, properties);
    }
  } catch (error) {
    console.warn('Analytics tracking error:', error);
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formType: string, formData?: Record<string, any>) {
  trackEvent('form_submission', {
    form_type: formType,
    timestamp: new Date().toISOString(),
    ...formData
  });
}

/**
 * Track navigation clicks
 */
export function trackNavigation(destination: string, source: string = 'navigation') {
  trackEvent('navigation_click', {
    destination,
    source,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string) {
  trackEvent('external_link_click', {
    url,
    link_text: linkText,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaType: string, location: string) {
  trackEvent('cta_click', {
    cta_type: ctaType,
    location,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track page section engagement
 */
export function trackSectionView(sectionName: string, timeOnSection?: number) {
  trackEvent('section_view', {
    section: sectionName,
    time_on_section: timeOnSection,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track download clicks
 */
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('download_click', {
    file_name: fileName,
    file_type: fileType,
    timestamp: new Date().toISOString()
  });
}