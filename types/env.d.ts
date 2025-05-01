declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET_KEY: string;
      // Add other environment variables you use
    }
  }
}

// Ensure this file is treated as a module
export {};
