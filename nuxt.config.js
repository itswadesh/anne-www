import { I18N } from './config/lang'
import { firebaseConfig } from './config/firebase'
import {
  HTTP_ENDPOINT,
  GRAPHCDN_ENDPOINT,
  DOMAIN,
  STRIPE_PUBLISHABLE_KEY,
  WWW_URL,
  head,
  tailwindcss,
  PORT,
} from './shared/config/index'
import { pwa } from './config/index'
// console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', HTTP_ENDPOINT, WWW_URL)
// const whitelist = ['preview-img-item']
const whitelistPatterns = [/^slick-/, /^vti__/, /^swal2-/, /^mx-/] // mx- is for vue2-datepicker
export default {
  server: {
    host: '0.0.0.0',
    port: PORT,
  },
  head,
  css: [
    '~/shared/assets/css/form.css',
    // '~/assets/fonts.css',
    '~/shared/assets/css/animations.css',
  ],
  plugins: [
    { src: '~/plugins/ripple.js', ssr: false },
    { src: '~/plugins/lazy.js', ssr: false },
    { src: '~/plugins/slick.js' },
    { src: '~/plugins/scroll.js', ssr: false },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/vue-pswipe.js', ssr: false },
    { src: '~/plugins/VueYoutube.js', ssr: false },
    // { src: '~/plugins/zoom.js', ssr: false },
    // { src: '~/plugins/agora.js', ssr: false },
    { src: '~/plugins/dir', ssr: true },
    { src: '~/plugins/gtag', ssr: false },
    { src: '~/plugins/api.js' },
    { src: '~/plugins/vue-mq.js' },
    { src: '~/plugins/disable-right-click', ssr: false },
    { src: '~/plugins/vue-stripe.js', ssr: false },
    // { src: '~/plugins/vue-braintree.js', ssr: false },
    // { src: '~/plugins/vue-stripe-plugin.js', ssr: false },
    // { src: '~/plugins/directives.js', ssr:false },
  ],
  // components: true,
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
    'nuxt-webfontloader',
    // '@nuxtjs/google-analytics',
    '@nuxt/image',
    '@nuxtjs/pwa',
    'vue-social-sharing/nuxt',
    [
      'nuxt-stripe-module',
      {
        publishableKey: STRIPE_PUBLISHABLE_KEY,
      },
    ],
    // 'nuxt-vite',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // '@nuxtjs/composition-api/module',
  ],
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'vue-sweetalert2/nuxt',
    ['nuxt-i18n', I18N],
    ['@nuxtjs/firebase', firebaseConfig],
  ],
  publicRuntimeConfig: {
    WWW_URL: `${WWW_URL}`,
    HTTP_ENDPOINT: `${HTTP_ENDPOINT}`,
    GRAPHCDN_ENDPOINT: `${GRAPHCDN_ENDPOINT}`,
    DOMAIN: `${DOMAIN}`,
    STRIPE_PUBLISHABLE_KEY: `${STRIPE_PUBLISHABLE_KEY}`,
  },
  privateRuntimeConfig: {
    firebaseAppId: process.env.FIREBASE_APP_ID,
  },
  pageTransition: 'slide-bottom',
  layoutTransition: 'slide-bottom',
  pwa,
  toast: {
    singleton: true,
    theme: 'toasted-primary',
    position: 'bottom-center',
  },
  purgeCSS: {
    // whitelist,
    whitelistPatterns,
  },
  tailwindcss,
  // googleAnalytics: {
  //   id: GOOGLE_ANALYTICS_ID,
  // },
  webfontloader: {
    google: {
      families: ['Inter:100,200,300,400,500,600,700&display=swap'],
    },
  },
  axios: {
    proxy: true,
  },
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
      // {
      //   httpEndpoint: `${WWW_URL}/graphql`,
      //   browserHttpEndpoint: '/graphql',
      //   // wsEndpoint: server.replace('http', 'ws') + '/graphql',
      // },
    },
    defaultOptions: {
      query: {
        loadingKey: 'loading',
        fetchPolicy: 'no-cache',
        // variables: { store: '60fd2383150af473d8e42ac9' },
      },
    },
  },
  proxy: {
    '/graphql': GRAPHCDN_ENDPOINT,
    '/api': HTTP_ENDPOINT,
    '/auth': HTTP_ENDPOINT,
    '/images': HTTP_ENDPOINT,
    '/assets': HTTP_ENDPOINT,
  },
  // build: {
  //   babel: {
  //     presets({ isServer }) {
  //       const targets = isServer ? { node: 'current' } : { ie: 11 }
  //       return [[require.resolve('@babel/preset-env'), { targets }]]
  //     },
  //     plugins: [
  //       '@babel/syntax-dynamic-import',
  //       '@babel/transform-runtime',
  //       '@babel/transform-async-to-generator',
  //     ],
  //   },
  //   parallel: true,
  // },
}
