'use server';

import { headers } from 'next/headers';
import { serverClient } from '@/sanity/lib/serverClient';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limiter: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function submitContactForm(formData: FormData) {
  try {
    // Honeypot check — bots fill hidden fields, humans don't
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      return { success: true }; // Silently ignore bot submissions
    }

    // Rate limiting by IP
    const headersList = await headers();
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown';

    if (!checkRateLimit(ip)) {
      return {
        success: false,
        error: 'Too many submissions. Please wait a few minutes before trying again.',
      };
    }

    // Sanitize and enforce max lengths
    const name = (formData.get('name') as string)?.trim().slice(0, 100);
    const email = (formData.get('email') as string)?.trim().slice(0, 254);
    const subject = (formData.get('subject') as string)?.trim().slice(0, 200);
    const message = (formData.get('message') as string)?.trim().slice(0, 5000);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: 'Please fill in all required fields',
      };
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Create the document in Sanity
    const result = await serverClient.create({
      _type: 'contact',
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'Failed to submit the form. Please try again later.',
    };
  }
}
