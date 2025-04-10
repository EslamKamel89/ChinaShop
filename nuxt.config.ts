// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/supabase",
  ],

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
  app: {
    head: {
      title: "ChinaShop",
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css",
          tagPosition: "head",
          rel: "stylesheet",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js",
          tagPosition: "bodyClose",
          type: "text/javascript",
          defer: true,
        },
      ],
    },
  },
});
