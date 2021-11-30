<template>
  <div class="flex flex-col items-center justify-center text-center">
    <img
      v-lazy="`/no/search.svg?tr=h-320,fo-auto`"
      alt="empty cart"
      class="my-5 object-contain h-80"
    />

    <span class="mb-3 text-xl md:text-3xl font-medium">
      We couldn't find any matches !!</span
    >

    <span class="mb-5 text-xs">{{ $route.query.q }}</span>

    <nuxt-link :to="localePath('/')">
      <PrimaryButtonRounded class="py-2 w-40 text-sm">
        Shop Now
      </PrimaryButtonRounded>
    </nuxt-link>
  </div>
</template>

<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: {
    PrimaryButtonRounded,
  },
}
</script>
