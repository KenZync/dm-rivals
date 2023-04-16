// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-adsense",
      {
        id: "ca-pub-9393835297385779",
      },
    ],
  ],
});
