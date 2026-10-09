function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required env var ${name}. Add it to .env`);
  }
  return value;
}

export const env = {
  // Trailing slash removed so `${env.API_URL}/auth/refresh` never becomes `//auth`.
  API_URL: required('VITE_API_URL', import.meta.env.VITE_API_URL).replace(/\/+$/, ''),
} as const;
