import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges class lists and lets later Tailwind classes override earlier ones,
// so components can accept a className that wins over their defaults.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
