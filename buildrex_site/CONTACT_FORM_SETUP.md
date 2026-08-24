# Buildrex Contact Form Setup Guide

This document explains how to set up the contact form for the buildrex.ie domain.

## Overview

The contact form uses:
- **reCAPTCHA v3** - Invisible bot protection from Google
- **Resend** - Email service for sending contact form submissions
- **Next.js API Routes** - Backend endpoint at `/api/contact`

## Configuration Steps

### 1. Set Up reCAPTCHA v3 for buildrex.ie

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click the **+** icon to create a new site
3. Fill in the form:
   - **Label:** `buildrex.ie`
   - **reCAPTCHA type:** Select `reCAPTCHA v3`
   - **Domains:** Add `buildrex.ie` and `www.buildrex.ie`
4. Accept the terms and click **Create**
5. You'll get two keys:
   - **Site Key** (public) → goes in `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret Key** (private) → goes in `RECAPTCHA_SECRET_KEY`

**Important:** Keep the Secret Key private and only use it on the server side.

### 2. Set Up Resend Email Service

1. Go to [Resend.com](https://resend.com)
2. Create a new account or log in
3. Verify your domain `buildrex.ie`:
   - Add DNS records for domain verification (Resend will provide instructions)
   - This allows you to send emails from `contact@buildrex.ie`
4. Generate an API key from your Resend dashboard
5. Copy this key to `RESEND_API_KEY`

**Important:** Resend requires domain verification before you can send emails.

### 3. Create Environment Variables File

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   RESEND_API_KEY=your_api_key_here
   CONTACT_EMAIL=nathan@buildrex.ie
   EMAIL_USER=contact@buildrex.ie
   ```

3. **For production (Netlify/deployment):** Add the same environment variables through your hosting platform's environment configuration settings.

## How It Works

### Contact Form Flow

1. **Frontend** (`components/contact/MiddleSection.tsx`):
   - User fills out the contact form
   - reCAPTCHA v3 executes invisibly in the background
   - Form data + reCAPTCHA token sent to `/api/contact`

2. **Backend** (`pages/api/contact.ts`):
   - Verifies reCAPTCHA token with Google
   - Checks reCAPTCHA score (0.0-1.0, higher = more likely human)
   - Validates form data
   - Sends email via Resend
   - Falls back to local file storage if email fails

3. **User Feedback**:
   - Success: Redirected to thank you page
   - Error: Toast notification with specific error message
   - Fallback: Message includes manual review notice

### Security Features

- **reCAPTCHA v3**: Invisible bot protection with score-based analysis
- **Score threshold**: Only accepts submissions with score ≥ 0.5
- **Fallback mode**: If reCAPTCHA fails, form can still be submitted with manual review flag
- **Email validation**: Basic regex validation before processing
- **CORS protection**: Only accepts requests from buildrex.ie domain
- **Local logging**: Failed submissions are saved to `contact-submissions.log` for recovery

## Testing

### Local Development
1. Run `npm run dev` or `pnpm dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check console for reCAPTCHA token logs
5. View email in Resend dashboard

### Testing with Fallback Mode
If reCAPTCHA is failing during testing, the form can still be submitted in fallback mode. The backend will:
- Accept the submission
- Flag it for manual review in the email subject
- Send it to the contact email address

## Troubleshooting

### reCAPTCHA Not Loading

**Error:** "Security verification unavailable"

**Solutions:**
- Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Verify your domain is added to the reCAPTCHA console
- Check network tab in browser dev tools for script loading
- Try incognito/private mode (extensions might block it)

### Emails Not Sending

**Error:** "Email failed to send"

**Solutions:**
- Verify `RESEND_API_KEY` is correct
- Ensure Resend domain is verified (check Resend dashboard)
- Verify `CONTACT_EMAIL` is a valid email address
- Check Resend logs for bounced emails
- Look at `contact-submissions.log` for manual follow-up

### Low reCAPTCHA Score

**Error:** "Security verification failed. Your interaction appears suspicious."

**Solutions:**
- This can happen if the reCAPTCHA score is below 0.5
- Try again with natural behavior (not rapid submissions)
- Use fallback mode if needed
- Contact site admin for manual submission

## Environment Variables Reference

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public | ✅ | reCAPTCHA v3 site key from Google |
| `RECAPTCHA_SECRET_KEY` | Secret | ✅ | reCAPTCHA v3 secret key from Google |
| `RESEND_API_KEY` | Secret | ✅ | API key from Resend.com |
| `CONTACT_EMAIL` | Config | ✅ | Email address to receive submissions |
| `EMAIL_USER` | Config | ❌ | Sender email (defaults to contact@buildrex.ie) |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Config | ❌ | Override API endpoint (for static hosting) |

## Files Modified/Created

- `.env.example` - Environment configuration template
- `pages/api/contact.ts` - API endpoint (already configured for buildrex)
- `components/contact/MiddleSection.tsx` - Contact form (already configured for buildrex)
- `hooks/useRecaptcha.ts` - reCAPTCHA v3 hook (ready to use)
- `pages/_app.tsx` - reCAPTCHA provider (configured with buildrex domain)

## Next Steps

1. Copy `.env.example` to `.env.local`
2. Set up reCAPTCHA v3 at Google reCAPTCHA console
3. Set up Resend and verify your domain
4. Fill in all environment variables
5. Test the contact form locally
6. Deploy to production with environment variables configured
