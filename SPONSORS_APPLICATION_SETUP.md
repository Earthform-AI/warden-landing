# Real Sponsors to Application Tie-ins Setup

This document explains how to set up the complete sponsor-applicant system with Supabase database integration.

## Overview

The system allows:
1. **Applicants** to apply for AI tools access through a form
2. **Sponsors** to browse approved applicants and select who to sponsor
3. **Real-time tracking** of sponsorships and impact reports
4. **Database-backed** user management with Supabase

## Database Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be ready
4. Copy your project URL and anon key

### 2. Run the Database Schema

1. Open the Supabase Dashboard → SQL Editor
2. Copy the contents of `database-schema.sql` 
3. Run the SQL to create all tables and policies

### 3. Environment Variables

Add these to your `.env` file or deployment environment:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## System Architecture

### API Endpoints

- **`/api/applicants`** - Create and list applicant applications
- **`/api/sponsors`** - Create and manage sponsor accounts  
- **`/api/sponsorships`** - Create sponsor-applicant matches
- **`/api/impact-reports`** - Track and report sponsorship impact (future)

### Database Tables

- **`applicants`** - Stores application data and approval status
- **`sponsors`** - Stores sponsor information and tier details
- **`sponsorships`** - Links sponsors to applicants with AI tools provided
- **`impact_reports`** - Tracks impact metrics and success stories
- **`testimonials`** - Real verified testimonials (future enhancement)

### User Interface

- **`/apply`** - Application form for AI tools access
- **`/sponsor-dashboard`** - Browse and select applicants to sponsor
- **Home page** - Enhanced sections with links to application and sponsorship

## Workflow

1. **Application Process**:
   - User fills out application form at `/apply`
   - Application stored with "pending" status
   - Admin reviews and approves applications (manual process initially)

2. **Sponsorship Process**:
   - Approved applicants appear in sponsor dashboard
   - Sponsors can browse applicants and select who to sponsor
   - Sponsorship creates active relationship and updates applicant status

3. **Impact Tracking**:
   - Recipients provide regular updates through impact reports
   - Sponsors receive notifications and progress updates
   - Success metrics tracked for program improvement

## Integration with Existing System

The new system integrates with the existing sponsorship forms:

- **Invite/Nominate section** now includes an "Apply" tab
- **Sponsor forms** link to the new sponsor dashboard
- **Existing Formspree forms** can continue to work alongside the database system
- **Payment processing** can be added later with Stripe integration

## Security Features

- Row Level Security (RLS) policies protect user data
- Applicants can only view/edit their own applications  
- Sponsors can only see approved applicants and their own sponsorships
- Public access limited to approved applicant browsing only

## Next Steps

1. **Set up Supabase project** and run schema
2. **Deploy with environment variables** 
3. **Test application and sponsorship flow**
4. **Add authentication system** for production use
5. **Integrate payment processing** for automated billing
6. **Build admin interface** for application approval
7. **Add email notifications** for status updates

## Testing

To test the system locally:

1. Set up Supabase project and add environment variables
2. Run `npm run dev` 
3. Visit `/apply` to test the application form
4. Visit `/sponsor-dashboard` to test sponsor interface (currently shows demo data)
5. Check Supabase dashboard to verify data is being stored

## Production Considerations

- **Authentication**: Add proper user authentication with Supabase Auth
- **Admin Interface**: Build admin dashboard for application approval
- **Email Integration**: Set up automated notifications
- **Payment Processing**: Integrate Stripe for recurring sponsorships
- **Analytics**: Track conversion rates and program success metrics