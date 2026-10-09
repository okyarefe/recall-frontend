import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge our custom tokens from app.css. Without this it reads
// `text-body` as a color and drops `text-inverse-foreground` from a Button.
// Add new size/radius/shadow/width tokens here too.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['hero', 'display', 'title', 'heading', 'body', 'caption', 'label'],
      radius: ['card', 'panel', 'pill'],
      shadow: ['card', 'float'],
      container: ['form', 'narrow', 'content', 'page'],
    },
  },
});

// Merges class lists and lets later Tailwind classes override earlier ones,
// so components can accept a className that wins over their defaults.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
