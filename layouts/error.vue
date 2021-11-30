<template>
  <div
    class="
      container
      max-w-7xl
      mx-auto
      px-2
      md:px-10
      text-gray-800
      flex flex-col
      p-6
      items-center
      justify-center
      text-center
      tracking-wide
    "
  >
    <div class="flex flex-col items-center justify-center text-center">
      <h1 class="mt-5 text-error font-bold text-4xl sm:text-8xl">ERROR !!</h1>

      <img
        v-lazy="`/no/page-not-found.svg?tr=h-320,fo-auto`"
        alt="empty cart"
        class="mb-5 object-contain h-80"
      />

      <span
        class="
          mb-3
          py-2
          px-4
          border border-error
          rounded-md
          bg-red-100
          font-medium
          text-error
        "
      >
        {{ error.message }}</span
      >

      <span class="mb-5 text-xs">{{ $route.query.q }}</span>

      <nuxt-link :to="localePath('/')" class="text-sm hover:underline">
        {{ store.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    error: { type: Object, default: null },
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      ...i18nHead,
      title: `Error Occured - ${this.store.name}`,
    }
  },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
  },
}
</script>

<style scoped>
h1 {
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
