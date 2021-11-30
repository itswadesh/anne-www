<template>
  <section class="flex flex-col items-center justify-center text-center">
    <img
      v-lazy="`/no/empty-animate.svg?tr=h-320,fo-auto`"
      alt="empty cart"
      class="mb-10 object-contain h-80"
    />

    <span class="mb-3 text-xl md:text-3xl font-medium">
      Your cart is empty !!</span
    >

    <span class="mb-5 text-xs">Add items to it now</span>

    <nuxt-link :to="localePath('/')">
      <PrimaryButtonRounded class="py-2 w-40 text-sm">
        Shop Now
      </PrimaryButtonRounded>
    </nuxt-link>
  </section>
</template>

<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { PrimaryButtonRounded },
}
</script>
