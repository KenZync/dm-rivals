// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "vercel-edge",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
  ],
  supabase:{
    redirect: false
  },
  css:[
    '@/assets/animation.css',
  ]
});
