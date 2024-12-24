import SnowFall from "snow-fall-effect";

export default defineNuxtPlugin((nuxtApp) => {
  const snowFall = new SnowFall({
    color: "#82deed",
    density: 1,
    sizeRange: [5, 25],
  });

  // Inject into the Nuxt app as $snowFall
  nuxtApp.provide("snowFall", snowFall);
});
