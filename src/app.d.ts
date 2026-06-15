/// <reference types="@sveltejs/kit" />

import type { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Error {
      message: string;
      code?: number;
    }

    interface Locals {
      supabase: SupabaseClient;
      session: Session | null;
    }

    interface PageData {
      session: Session | null;
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
