/// <reference types="astro/client" />

declare global {
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      [key: string]: any;
    }
  }
}

export {};
