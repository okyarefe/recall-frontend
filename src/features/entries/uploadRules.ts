import { formatFileSize } from './formatFileSize';

const ACCEPTED_TYPES: Record<string, string> = {
  'application/pdf': '.pdf',
  'text/plain': '.txt',
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ACCEPT_ATTRIBUTE = [
  ...Object.keys(ACCEPTED_TYPES),
  ...Object.values(ACCEPTED_TYPES),
].join(',');

export const ACCEPTED_FILES_HINT = `PDF or TXT, up to ${formatFileSize(MAX_FILE_SIZE)} each`;

export function validateFile(file: File): string | null {
  if (!(file.type in ACCEPTED_TYPES)) return 'Only PDF and TXT files are supported.';
  if (file.size > MAX_FILE_SIZE) return `File is larger than ${formatFileSize(MAX_FILE_SIZE)}.`;
  return null;
}
