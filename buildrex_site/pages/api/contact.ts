// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from 'resend';
import fs from "fs";
import path from "path";

// Fallback function to save form submissions locally
async function saveFormSubmissionLocally(formData: any) {
  try {
    const timestamp = new Date().toISOString();
    const submission = {
      timestamp,
      ...formData,
      note: "Email delivery failed - manual follow-up required"
    };
    
    const logFile = path.join(process.cwd(), 'contact-submissions.log');
    const logEntry = `${JSON.stringify(submission)}\n`;
    
    fs.appendFileSync(logFile, logEntry);
    console.log('Form submission saved locally:', submission);
  } catch (error) {
    console.error('Failed to save form submission locally:', error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers to allow requests from your frontend domain
  res.setHeader('Access-Control-Allow-Origin', 'https://www.buildrex.ie');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { name, email, phone, subject, message, recaptchaV3Token, fallbackMode } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required fields",
    });
  }

  // Handle fallback mode (when reCAPTCHA is not working)
  if (fallbackMode || recaptchaV3Token === 'fallback_mode') {
    console.log('Processing form in fallback mode (no reCAPTCHA verification)');
    // Continue to email processing without reCAPTCHA verification
  } else {
    // Validate reCAPTCHA v3 token (required in normal mode)
    if (!recaptchaV3Token) {
      return res.status(400).json({
        success: false,
        error: "Security verification failed. Please try again.",
      });
    }

    console.log('Received reCAPTCHA v3 token:', {
      exists: !!recaptchaV3Token,
      length: recaptchaV3Token?.length,
      type: typeof recaptchaV3Token,
      firstChars: recaptchaV3Token?.substring(0, 10) + '...'
    });

    // Verify reCAPTCHA v3 with Google
    try {
      console.log('Verifying reCAPTCHA v3 token...');
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaV3Token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const recaptchaResult = await recaptchaResponse.json();
      console.log('reCAPTCHA v3 verification result:', { 
        success: recaptchaResult.success, 
        score: recaptchaResult.score,
        action: recaptchaResult.action,
        errors: recaptchaResult['error-codes'] 
      });

      if (!recaptchaResult.success) {
        const errorCodes = recaptchaResult['error-codes'] || [];
        console.error('reCAPTCHA v3 verification failed:', errorCodes);
        
        if (errorCodes.includes('invalid-input-secret')) {
          console.error('reCAPTCHA secret key is invalid. Please check environment variables.');
          return res.status(500).json({
            success: false,
            error: "Security verification failed due to a server configuration issue. Please contact us directly.",
            errorCode: 'server-config-error'
          });
        }
        
        if (errorCodes.includes('invalid-input-response')) {
          console.error('reCAPTCHA response token is invalid.', errorCodes);
          return res.status(400).json({
            success: false,
            error: "Security token is invalid or has expired. Please refresh and try again.",
            errorCode: 'invalid-recaptcha-response'
          });
        }

        // For other errors, return a generic message but log the details
        let errorMessage = "Security verification failed. Your request could not be processed.";
        if (errorCodes.includes('timeout-or-duplicate')) {
          errorMessage = "Security token expired. Please refresh the page and try again.";
        }
        
        return res.status(400).json({
          success: false,
          error: errorMessage,
          errorCode: 'recaptcha-failed'
        });
      } else {
        // Check reCAPTCHA v3 score (0.0 is very likely a bot, 1.0 is very likely a good interaction)
        if (recaptchaResult.score < 0.5) {
          console.warn('Low reCAPTCHA v3 score detected:', recaptchaResult.score);
          return res.status(400).json({
            success: false,
            error: "Security verification failed. Your interaction appears suspicious. Please try again or contact us directly.",
            errorCode: 'low-recaptcha-score'
          });
        }

        // Verify the action matches what we expect
        if (recaptchaResult.action !== 'contact_form_submit') {
          console.warn('Unexpected reCAPTCHA action:', recaptchaResult.action);
          return res.status(400).json({
            success: false,
            error: "Security verification failed. Invalid action detected.",
            errorCode: 'invalid-recaptcha-action'
          });
        }
      }
    } catch (error) {
      console.error("reCAPTCHA v3 verification error:", error);
      console.log('reCAPTCHA verification error, allowing form submission with manual review flag');
      // Continue to email processing in case of reCAPTCHA service issues
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address",
    });
  }

  try {
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailData = {
      from: `Buildrex Website <${process.env.EMAIL_USER || 'contact@buildrex.ie'}>`,
      to: [process.env.CONTACT_EMAIL || "nathan@buildrex.ie"],
      subject: `New Contact Form Submission: ${subject || "General Inquiry"}${fallbackMode ? " [MANUAL REVIEW]" : ""}`,
      html: `
        <h2>New Contact Form Submission</h2>
        ${fallbackMode ? '<p style="color: orange; font-weight: bold;">⚠️ MANUAL REVIEW REQUIRED - Submitted without reCAPTCHA verification</p>' : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service Interest:</strong> ${subject || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>This message was sent via the Buildrex website contact form.${fallbackMode ? " (No reCAPTCHA verification - manual review recommended)" : ""}</small></p>
      `,
      text: `
        New Contact Form Submission
        ${fallbackMode ? "\n⚠️ MANUAL REVIEW REQUIRED - Submitted without reCAPTCHA verification\n" : ""}
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Service Interest: ${subject || "Not specified"}
        
        Message:
        ${message}
        
        ---
        This message was sent via the Buildrex website contact form.${fallbackMode ? " (No reCAPTCHA verification - manual review recommended)" : ""}
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }

    console.log('Email sent successfully via Resend:', data);
    res.status(200).json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error("Email error:", error);
    
    // Save form submission locally as backup
    await saveFormSubmissionLocally({ name, email, phone, subject, message });
    
    // Provide specific error messages based on error type
    let errorMessage = "Email failed to send. Please try again or contact us directly.";
    
    if (error.message?.includes('API key')) {
      errorMessage = "Email service configuration error. Please contact us directly at nathan@buildrex.ie";
    } else if (error.message?.includes('rate limit')) {
      errorMessage = "Too many requests. Please try again in a few minutes or contact us directly at nathan@buildrex.ie";
    } else if (error.message?.includes('domain')) {
      errorMessage = "Email domain verification required. Please contact us directly at nathan@buildrex.ie";
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage
    });
  }
}
