// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "nuxt-auth-utils",
    "@prisma/nuxt",
    "@unlok-co/nuxt-stripe",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          type: "text/javascript",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/daisyui@5",
          type: "text/css",
        },
      ],
    },
  },
});