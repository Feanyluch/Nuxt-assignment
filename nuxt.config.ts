// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
});

buildModules: ["@nuxtjs/google-fonts"];

googleFonts : {
  families: {
    inter: [300, 500, 700]
  }
}