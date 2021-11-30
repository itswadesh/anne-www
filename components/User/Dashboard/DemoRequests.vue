<template>
  <div class="w-full text-gray-800">
    <div
      v-if="listLoading"
      class="
        grid grid-cols-2
        gap-4
        mt-4
        sm:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      "
    >
      <DemoRequestSkeleton v-for="(p, ix) in 10" :key="ix" />
    </div>

    <div v-if="myDemoRequests">
      <div
        v-if="myDemoRequests.count === 0"
        class="flex flex-col items-center justify-center text-center"
      >
        <img
          v-lazy="`/no/demo-request.svg?tr=h-320,fo-auto`"
          alt="empty cart"
          class="mb-10 object-contain h-80"
        />

        <span class="mb-3 text-xl md:text-3xl font-medium">
          You Have No Demo Request !!</span
        >

        <span class="mb-5 text-xs">Add request to it now</span>

        <nuxt-link :to="localePath('/')">
          <PrimaryButtonRounded class="py-2 w-40 text-sm">
            Shop Now
          </PrimaryButtonRounded>
        </nuxt-link>
      </div>

      <div v-else class="relative">
        <div>
          <h1
            class="mb-3 sm:mb-5 text-xl sm:text-2xl font-semibold tracking-wide"
          >
            My Demo Requests({{ myDemoRequests.count }})
          </h1>

          <div
            class="
              grid grid-cols-2
              gap-4
              mt-4
              sm:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            "
          >
            <div
              v-for="w in myDemoRequests.data"
              :key="w.id"
              class="
                relative
                border
                bg-white
                shadow-md
                hover:shadow-xl
                rounded-md
              "
            >
              <div v-if="w.product" class="flex flex-col">
                <!-- <div class="flex justify-end p-1 bg-white">
                    <button
                      class="z-30 flex justify-end focus:outline-none focus:ring-0 focus:ring-offset-0"
                      @click="toggleDemoRequests(w.product.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-gray-400 hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div> -->

                <nuxt-link
                  v-if="w.product"
                  :to="localePath(`/${w.product.slug}?id=${w.product.id}`)"
                  class="mb-2 group"
                >
                  <div class="mb-2 sm:mb-4 overflow-hidden">
                    <img
                      v-lazy="`${w.product.imgCdn}?tr=h-224,fo-auto`"
                      alt="mobile"
                      class="
                        object-contain object-top
                        w-full
                        h-48
                        sm:h-56
                        transform
                        group-hover:scale-105
                        transition
                        duration-300
                      "
                    />
                  </div>

                  <div class="px-2 sm:px-4 text-sm">
                    <div class="mb-2 line-clamp-2 font-medium">
                      {{ w.product.name }}
                    </div>

                    <div
                      class="
                        flex flex-row
                        items-center
                        overflow-hidden
                        whitespace-nowrap
                        overflow-ellipsis
                      "
                    >
                      <div class="me-2">
                        <b>{{
                          w.product.price
                            | currency(
                              store.currencySymbol,
                              store.currencyDecimals
                            )
                        }}</b>
                      </div>

                      <strike
                        v-if="w.product.price < w.product.mrp"
                        class="me-2 text-gray-500"
                      >
                        {{
                          w.product.mrp
                            | currency(
                              store.currencySymbol,
                              store.currencyDecimals
                            )
                        }}
                      </strike>

                      <div
                        v-if="w.product.price < w.product.mrp"
                        class="text-success truncate"
                      >
                        {{
                          Math.floor((w.product.price * 100) / w.product.mrp)
                        }}% off
                      </div>
                    </div>
                  </div>
                </nuxt-link>

                <div class="mb-2 sm:mb-4 px-2 sm:px-4">
                  <h6 class="mb-2 text-sm">
                    {{ w.scheduleDateTime | date }}
                  </h6>

                  <a
                    :href="`${settings.LIVE_COMMERCE_URL}/demo-requests/${w.id}`"
                    target="_blank"
                  >
                    <PrimaryButtonRounded class="w-full text-sm">
                      Join Call Now
                    </PrimaryButtonRounded></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- if there is no items in cart -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DemoRequestSkeleton from '~/components/AllSkeletons/DemoRequestSkeleton.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'

export default {
  components: {
    DemoRequestSkeleton,
    PrimaryButtonRounded,
    GrnIndGradiantButton,
  },

  data() {
    return {
      loading: false,
      listLoading: false,
      myDemoRequests: null,
    }
  },

  computed: {
    ...mapGetters({
      store: 'store',
      settings: 'settings',
    }),
  },

  async created() {
    await this.getDemoRequests()
  },

  methods: {
    async getDemoRequests() {
      this.listLoading = true
      try {
        this.myDemoRequests = await this.$get(
          'scheduleDemo/myScheduleDemos',
          {}
        )
      } catch (e) {
      } finally {
        this.listLoading = false
      }
    },
  },
}
</script>

<style scoped>
@media (max-width: 768px) {
  .height {
    height: 55%;
  }
}

@media (min-width: 768px) {
  .height {
    height: 60%;
  }
}
</style>
