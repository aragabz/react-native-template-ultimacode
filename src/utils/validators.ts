import { z } from 'zod';

const emailSchema = z.string().trim().email();
const passwordMinSchema = z.string().min(8);
const strongPasswordSchema = z
  .string()
  .min(8)
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/\d/, 'Must contain a digit')
  .regex(/[!@#$%^&*]/, 'Must contain a special character');
const urlSchema = z
  .string()
  .trim()
  .pipe(z.url({ protocol: /^https?$/ }));
const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');
const nonEmptySchema = z.string().trim().min(1);

export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function isValidPassword(password: string): boolean {
  return passwordMinSchema.safeParse(password).success;
}

export function isStrongPassword(password: string): boolean {
  return strongPasswordSchema.safeParse(password).success;
}

export function isValidUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}

export function isValidPhone(phone: string): boolean {
  return phoneSchema.safeParse(phone.replace(/[\s()-]/g, '')).success;
}

export function isNonEmpty(value: string | null | undefined): boolean {
  return nonEmptySchema.safeParse(value ?? '').success;
}
