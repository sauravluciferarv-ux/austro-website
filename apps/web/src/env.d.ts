/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SANITY_STUDIO_URL: string;
  readonly SANITY_API_READ_TOKEN: string;
  readonly SANITY_PREVIEW_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    isPreview: boolean;
  }
}
