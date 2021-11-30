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
      <WishlistSkeleton v-for="(p, ix) in 10" :key="ix" />
    </div>

    <div v-if="myWishlist">
      <div
        v-if="myWishlist.count === 0"
        class="flex flex-col items-center justify-center text-center"
      >
        <img
          v-if="store.isFnb"
          v-lazy="`/img/wishlist/food-wishlist.svg?tr=h-320,fo-auto`"
          alt="empty wishlist"
          class="mb-10 object-contain h-80"
        />

        <img
          v-else
          v-lazy="`/img/wishlist/wishlist.svg?tr=h-320,fo-auto`"
          alt="empty wishlist"
          class="mb-10 object-contain h-80"
        />

        <span class="mb-3 text-xl md:text-3xl font-medium">
          Empty Wishlist !!</span
        >

        <span class="mb-5 text-xs">
          You have no items in your Wishlist. Start adding</span
        >

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
            My Wishlist ({{ myWishlist.count }})
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
              v-for="w in myWishlist.data"
              :key="w.id"
              class="
                relative
                border
                bg-white
                shadow-md
                rounded-md
                cursor-pointer
              "
            >
              <div v-if="w.product">
                <!-- Close button start -->

                <button
                  type="button"
                  class="
                    absolute
                    z-10
                    p-1
                    transition
                    duration-300
                    transform
                    rounded-md
                    hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-md
                    top-2
                    right-2
                    focus:outline-none
                    focus:ring-0
                    focus:ring-offset-0
                    focus:scale-75
                    hovereffect
                  "
                  @click="toggleWishlist(w.product.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <!-- Close button end -->

                <nuxt-link
                  v-if="w.product"
                  :to="localePath(`/${w.product.slug}?id=${w.product.id}`)"
                  class="cols-span-1"
                >
                  <div class="">
                    <div class="overflow-hidden">
                      <img
                        v-lazy="`${w.product.img}?tr=h-224,fo-auto`"
                        alt="mobile"
                        class="object-contain object-top w-full h-48 sm:h-56"
                      />
                    </div>

                    <div class="p-2 sm:p-4 mx-auto text-sm text-center">
                      <h4
                        v-if="store.isFnb && w.product.vendorInfoBusinessName"
                        class="mb-2 font-semibold"
                      >
                        {{ w.product.vendorInfoBusinessName }}
                      </h4>

                      <h4
                        v-else-if="!store.isFnb && w.product && w.product.brand"
                        class="mb-2 font-semibold"
                      >
                        {{ w.product.brand.name }}
                      </h4>

                      <div class="mb-2 flex items-start justify-center">
                        <h6 class="me-3 font-medium truncate">
                          {{ w.product.name }}
                        </h6>

                        <div v-if="store.isFnb">
                          <img
                            v-if="w.product.foodType === 'V'"
                            v-lazy="`/img/veg.png`"
                            alt="veg"
                            class="h-5 w-5"
                          />

                          <img
                            v-else-if="
                              w.product.foodType === 'N' ||
                              w.product.foodType === 'E'
                            "
                            v-lazy="`/img/non-veg.png`"
                            alt="non veg"
                            class="h-5 w-5"
                          />

                          <img
                            v-else
                            v-lazy="`/img/other.png`"
                            alt="other"
                            class="h-5 w-5"
                          />
                        </div>
                      </div>

                      <div
                        class="
                          flex flex-row
                          justify-center
                          items-center
                          overflow-hidden
                          whitespace-nowrap
                          overflow-ellipsis
                        "
                      >
                        <div class="me-2">
                          <b>{{
                            w.product.price | currency(store.currencySymbol)
                          }}</b>
                        </div>

                        <strike
                          v-if="w.product.price < w.product.mrp"
                          class="me-2 text-gray-500"
                        >
                          {{ w.product.mrp | currency(store.currencySymbol) }}
                        </strike>

                        <div
                          v-if="w.product.price < w.product.mrp"
                          class="text-success"
                        >
                          {{
                            Math.floor((w.product.price * 100) / w.product.mrp)
                          }}% off
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
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
import WishlistSkeleton from '~/components/AllSkeletons/WishlistSkeleton.vue'
import NuxtLink from '~/components/NuxtLink.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import MY_WISHLIST from '~/gql/wishlist/myWishlist.gql'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'

export default {
  components: { WishlistSkeleton, NuxtLink, PrimaryButtonRounded },

  data() {
    return {
      loading: false,
      listLoading: false,
      myWishlist: null,
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },

  async created() {
    await this.getWishlist()
  },
  methods: {
    async getWishlist(id) {
      this.listLoading = true
      // console.log('getting wishlist', this.getWishlist)
      try {
        this.myWishlist = await this.$get('wishlist/myWishlist', {})
        // this.myWishlist = (
        //   await this.$apollo.query({
        //     query: MY_WISHLIST,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.myWishlist
      } catch (e) {
        // console.log(e)
      } finally {
        this.listLoading = false
      }
    },
    async toggleWishlist(id) {
      this.loading = true
      // console.log()
      try {
        await this.$post('wishlist/toggleWishlist', {
          product: id,
          variant: id,
        })
        // await this.$apollo.mutate({
        //   mutation: TOGGLE,
        //   variables: {
        //     product: id,
        //     variant: id,
        //   },
        //   fetchPolicy: 'no-cache',
        // })

        await this.getWishlist()
        // console.log('add to wishlist', this.toggleWishlist)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.hovereffect:hover svg {
  @apply text-white transition duration-300;
}

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
