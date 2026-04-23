# Earthform.ai Email Setup Guide

> **Status:** Updated 2026-04-23. Google Workspace selected as primary email.
> Domain `earthform.ai` pointed at Vercel for web, Google for email.

## Overview

You need `@earthform.ai` email addresses for:
- Professional outreach (consulting, grants, SBIR applications)
- Supabase Auth confirmation emails (from: noreply@earthform.ai)
- GitHub org verification
- Domain-verified correspondence
- **Google Calendar integration** with beacon system (routing job notifications)

## Recommended: Google Workspace ($7/mo)

Vercel doesn't provide email hosting, but your domain DNS is likely managed through your registrar (or Vercel DNS if you transferred). You have two sub-options:

### A1. ImprovMX (Free tier — recommended to start)

[ImprovMX](https://improvmx.com) provides free email forwarding for custom domains.

1. **Sign up** at https://improvmx.com
2. **Add domain** `earthform.ai`
3. **Add MX records** at your DNS provider:

   ```
   MX  earthform.ai  mx1.improvmx.com  10
   MX  earthform.ai  mx2.improvmx.com  20
   ```

4. **Add SPF record** (TXT):

   ```
   TXT  earthform.ai  "v=spf1 include:spf.improvmx.com ~all"
   ```

5. **Create aliases**:
   - `josh@earthform.ai` → your personal email
   - `hello@earthform.ai` → your personal email
   - `noreply@earthform.ai` → your personal email (for monitoring)

6. **Send-as setup** (optional, for outbound from `josh@earthform.ai`):
   - ImprovMX Premium ($9/mo) adds SMTP for sending
   - OR use Gmail's "Send mail as" with an SMTP relay (see Option B)

**Free tier limits**: 25 forwards/day (enough for early stage). No sending capability.

### A2. Cloudflare Email Routing (Free, if you move DNS to Cloudflare)

If you'd prefer Cloudflare:
1. Add `earthform.ai` to Cloudflare (free plan)
2. Email Routing → Create rules → forward to personal email
3. Cloudflare adds MX + SPF automatically
4. Same limitation: forwarding only, no sending without SMTP relay

## Option B: Google Workspace (Professional, $7/mo)

> **This is the selected path.** Google Workspace gives you Gmail, Calendar,
> Drive, and SMTP sending — all of which the beacon system will use.

### Vercel + Google Workspace coexistence

Vercel serves your website. Google Workspace handles email. They share the
same domain but use different DNS record types — **no conflict**:

| Record Type | Service | What It Does |
|---|---|---|
| `A` / `CNAME` | **Vercel** | Routes `earthform.ai` web traffic to Vercel |
| `MX` | **Google** | Routes `@earthform.ai` email to Gmail |
| `TXT` (SPF) | **Google** | Authenticates outbound email |
| `TXT` (DKIM) | **Google** | Cryptographic email signing |
| `TXT` (DMARC) | **Both** | Email policy enforcement |

**DNS provider requirement**: Your registrar (or Vercel DNS if you transferred
nameservers) must support adding MX records alongside the existing A/CNAME
records. Most registrars do. Vercel DNS does.

### Setup steps

1. **Sign up** at https://workspace.google.com ($7/mo per user, "Business Starter")
2. **Verify domain** ownership (TXT record or CNAME)
3. **Add MX records**:

   ```
   MX  earthform.ai  aspmx.l.google.com       1
   MX  earthform.ai  alt1.aspmx.l.google.com   5
   MX  earthform.ai  alt2.aspmx.l.google.com   5
   MX  earthform.ai  alt3.aspmx.l.google.com  10
   MX  earthform.ai  alt4.aspmx.l.google.com  10
   ```

4. **Add SPF**:
   ```
   TXT  earthform.ai  "v=spf1 include:_spf.google.com ~all"
   ```

5. **Enable DKIM**: In Google Workspace Admin → Apps → Gmail → Authenticate email
6. **Add DMARC**:
   ```
   TXT  _dmarc.earthform.ai  "v=DMARC1; p=quarantine; rua=mailto:josh@earthform.ai"
   ```

**Gives you**:
- `josh@earthform.ai` as a full Gmail inbox (works in Gmail app)
- Google Calendar for beacon job notifications + scheduling
- Google Drive for document collaboration
- SMTP sending for Supabase auth emails (no extra service needed)
- OAuth2 app credentials for Calendar API integration (beacon → calendar events)

### Supabase SMTP with Google Workspace

Google Workspace includes SMTP sending. Configure Supabase to send through it:

1. **Google Admin** → Apps → Gmail → End User Access → enable "Less secure apps"
   OR (better) create an App Password: Google Account → Security → App passwords
2. **Supabase Dashboard** → Authentication → SMTP Settings:
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **Username**: `noreply@earthform.ai` (create as alias or separate user)
   - **Password**: App Password from step 1
   - **Sender**: `Earthform <noreply@earthform.ai>`

This eliminates the need for Resend or any third-party SMTP relay.

## Option C: Zoho Mail (Free for 1 user)

Zoho offers free custom domain email for up to 5 users:

1. Sign up at https://www.zoho.com/mail/zohomail-pricing.html (free plan)
2. Verify domain, add MX records per Zoho instructions
3. Full webmail interface at mail.zoho.com
4. **Limit**: 5 GB storage, no IMAP/POP on free tier (web only)

## DNS Records Quick Reference

Regardless of email provider, you'll also want these records for `earthform.ai`:

| Type | Name | Value | Purpose |
|---|---|---|---|
| A | `@` | 76.76.21.21 | Vercel (if using Vercel DNS) |
| CNAME | `www` | `cname.vercel-dns.com` | Vercel www redirect |
| TXT | `@` | `v=spf1 ...` | Email authentication |
| TXT | `_dmarc` | `v=DMARC1; ...` | Email policy |
| MX | `@` | (per provider) | Email routing |

## Vercel Custom Domain Setup

If `earthform.ai` isn't already pointing to your Vercel project:

1. Go to https://vercel.com/dashboard → your project → Settings → Domains
2. Add `earthform.ai`
3. Vercel will tell you which DNS records to add
4. If the domain registrar supports it, you can also transfer DNS to Vercel:
   - Settings → Domains → Transfer nameservers to Vercel

To check current status:
```bash
# Check if earthform.ai resolves
dig earthform.ai A +short

# Check MX records
dig earthform.ai MX +short

# Check if Vercel is serving the site
curl -sI https://earthform.ai | head -5
```

## Supabase Auth Email Configuration

Once you have a sending email address, update Supabase to send auth emails from your domain:

1. **Supabase Dashboard** → Authentication → Email Templates
2. **SMTP Settings** → Enable Custom SMTP
3. Configure:
   - **Host**: (per your email provider's SMTP settings)
   - **Port**: 587 (TLS)
   - **Username**: `noreply@earthform.ai`
   - **Password**: app-specific password
   - **Sender**: `Earthform <noreply@earthform.ai>`

If using ImprovMX (free, no SMTP), you'll need a separate SMTP service:
- **Resend** (free tier: 100 emails/day) — https://resend.com
- **Brevo** (free tier: 300 emails/day) — https://brevo.com

Resend is the simplest — one API key, add your domain, verify with DNS TXT record, then use their SMTP gateway in Supabase.

## Recommended Path

Since you're setting up Google Workspace:

1. **Google Workspace signup** → verify `earthform.ai` → add MX + SPF + DKIM + DMARC
2. **Supabase SMTP** → configure with `smtp.gmail.com` using App Password
3. **Test auth flow** → sign up on earthform.ai → receive confirmation from `noreply@earthform.ai`
4. **Calendar API** (Phase 2) → OAuth2 credentials → beacon notifications as calendar events

Total cost: $7/mo. All email + calendar + SMTP in one service.

## Checklist

- [ ] Sign up for Google Workspace ($7/mo Business Starter)
- [ ] Verify `earthform.ai` domain ownership
- [ ] Add MX records (keep existing A/CNAME for Vercel)
- [ ] Add SPF TXT record (`include:_spf.google.com`)
- [ ] Enable DKIM in Google Admin
- [ ] Add DMARC TXT record
- [ ] Create `noreply@earthform.ai` (alias or user)
- [ ] Generate App Password for Supabase SMTP
- [ ] Configure Supabase custom SMTP → `smtp.gmail.com:587`
- [ ] Test: sign up on earthform.ai → receive confirmation email
- [ ] Create OAuth2 credentials for Calendar API (Phase 2)
- [ ] ~~Update `src/site.config.ts` meta URL~~ ✅ Already done
