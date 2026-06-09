/// <reference types="@sveltejs/kit" />

declare global {
  namespace App {
    interface Error {
      message: string;
      code?: number;
    }

    interface Locals {
      // Server-side locals (if any)
    }

    interface PageData {
      // Per-page data type
    }

    interface PageState {
      // Per-page state type
    }

    interface Platform {
      // Platform-specific context
    }
  }
}

export {};
