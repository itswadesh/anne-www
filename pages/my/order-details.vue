<template>
  <section v-if="order" class="bg-white text-gray-800">
    <div
      class="
        mb-5
        tracking-wide
        bg-gray-100
        px-4
        pt-2
        pb-1
        flex flex-wrap
        text-sm
        items-center
        justify-between
      "
    >
      <h5 class="pb-1 me-5"><b>Order No :</b> {{ order.orderNo }}</h5>

      <h5 class="pb-1"><b>Order Date </b>: {{ order.createdAt | date }}</h5>
    </div>

    <!-- Order detail  -->

    <div class="sm:flex sm:justify-between border-b-2 border-gray-200 pb-5">
      <div class="sm:w-1/2 sm:border-r-2 sm:border-gray-200 sm:pe-5">
        <div class="flex space-x-5">
          <nuxt-link :to="`/${order.slug}?id=${order.pid}`">
            <img
              v-lazy="`${order.imgCdn}?tr=w-160,fo-auto`"
              alt=""
              class="w-20 sm:w-40 object-contain object-top mb-5 xl:mb-0"
            />
          </nuxt-link>

          <div class="flex-1 w-full flex flex-col xl:pe-5">
            <h4
              v-if="store.isFnb && order.vendorInfoBusinessName"
              class="mb-1 sm:mb-2 text-base sm:text-lg font-semibold capitalize"
            >
              {{ order.vendorInfoBusinessName }}
            </h4>

            <h4
              v-else-if="!store.isFnb && order.brandName"
              class="mb-1 sm:mb-2 text-base sm:text-lg font-semibold capitalize"
            >
              {{ order.brandName }}
            </h4>

            <div class="mb-1 sm:mb-2 flex items-center justify-between">
              <nuxt-link
                :to="`/${order.slug}?id=${order.pid}`"
                class="
                  me-3
                  text-sm
                  md:text-base
                  text-gray-500
                  hover:text-primary-500
                  truncate
                "
              >
                {{ order.name }}
              </nuxt-link>

              <div v-if="store.isFnb">
                <img
                  v-if="order.foodType === 'V'"
                  v-lazy="`/img/veg.png`"
                  alt="veg"
                  class="h-5 w-5"
                />

                <img
                  v-else-if="order.foodType === 'N' || order.foodType === 'E'"
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

            <div class="flex flex-wrap items-center text-sm whitespace-nowrap">
              <h5 v-if="order.size != null && ''" class="mb-2 me-5">
                Size: {{ order.size }}
              </h5>

              <h5 v-if="order.color != null && ''" class="mb-2">
                Color: {{ order.color }}
              </h5>
            </div>

            <h6
              v-if="order.vendor"
              class="mb-2 text-sm font-light text-gray-500"
            >
              Seller: {{ order.vendorInfoBusinessName }}
            </h6>

            <h4 class="mb-5 font-semibold">
              {{
                order.price
                  | currency(store.currencySymbol, store.currencyDecimals)
              }}
            </h4>

            <button
              v-if="settings.liveCommerce"
              type="button"
              class="
                max-w-max
                px-4
                py-2
                text-primary-500
                hover:text-white
                bg-transparent
                hover:bg-primary-500
                border border-primary-500
                hover:shadow-md
                rounded-full
                transform
                active:scale-95
                transition
                duration-300
                font-semibold
                text-sm
                focus:outline-none focus:ring-0 focus:ring-offset-0
              "
              @click="
                populateDemoScheduler({ id: order.pid, name: order.name })
              "
            >
              Schedule a demo
            </button>
          </div>
        </div>
      </div>

      <div
        class="
          border-t border-dashed border-gray-200
          sm:border-t-0
          mt-5
          pt-5
          sm:pt-0 sm:mt-0 sm:w-1/2 sm:px-5
          lg:px-10
        "
      >
        <h4 class="font-semibold">Delivery Address</h4>

        <p class="mt-2 text-sm text-gray-500 font-light flex flex-col">
          <span>
            {{ order.userFirstName }} {{ order.userLastName }},
            {{ order.address.address }}, {{ order.address.town }},
            {{ order.address.city }}, {{ order.address.state }}</span
          >
          <span>{{ order.address.zip }}</span>
        </p>

        <h6 v-if="order.userPhone" class="mt-2 text-sm">
          Phone number: <span> {{ order.userPhone }}</span>
        </h6>
      </div>
    </div>

    <!-- Order Tracker -->

    <div>
      <div class="xl:flex xl:items-center xl:justify-between">
        <h4
          v-if="store.isFnb && order.status !== 'Delivered'"
          class="xl:w-2/3 my-5 flex-1"
        >
          <span class="font-medium">Expected Delivery Date : </span>

          <span class="text-sm font-light text-gray-500">{{ deliveryBy }}</span>
        </h4>

        <div
          v-if="order.status === 'Delivered'"
          class="mt-2 xl:mt-0 xl:w-1/3 flex items-center xl:justify-center"
        >
          <!-- <div
            class="
              w-16
              h-8
              flex
              items-center
              justify-center
              rounded
              flex-shrink-0
              me-4
            "
            style="background: #e1e1e1"
          >
            <span>3.9</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              style="color: #f2b200"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div> -->
          <nuxt-link
            :to="`/rate-this-product?id=${order.pid}`"
            class="
              text-primary-500
              focus:outline-none
              hover:underline
              whitespace-nowrap
            "
          >
            Rate & Review Product
          </nuxt-link>
        </div>
      </div>

      <div class="mt-5 xl:flex xl:items-center xl:justify-between">
        <OrderTracking v-if="!isReturn()" :order="order" />

        <ReturnTracking v-else :order="order" />

        <div class="mt-10 mb-5 xl:mb-0 xl:mt-0 xl:w-1/3">
          <div class="flex flex-col xl:items-center xl:justify-center">
            <a
              v-if="order.invoiceLink"
              :href="order.invoiceLink"
              target="blank"
              class="
                flex
                justify-center
                items-center
                py-2
                h-12
                w-48
                bg-primary-500
                transition
                duration-300
                tezt-lg
                text-white
                font-medium
                border-2 border-primary-500
                focus:outline-none
                transform
                active:scale-95
              "
            >
              Download Invoice
            </a>

            <nuxt-link
              v-if="
                order.returnValidTill != null &&
                now <= order.returnValidTill &&
                !isReturn()
              "
              :to="`/my/return?orderId=${$route.query.orderId}&itemId=${$route.query.itemId}`"
              class="
                mt-3
                h-12
                w-48
                hover:bg-primary-500
                transition
                duration-300
                tezt-lg
                text-primary-500
                hover:text-white
                font-medium
                border-2 border-primary-500
                focus:outline-none
                transform
                active:scale-95
                flex
                items-center
                justify-center
              "
            >
              Cancel & Return
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <DemoRequestModal
      v-if="selectedProduct"
      :show="showDemoScheduler"
      :product="selectedProduct"
    />
  </section>
</template>

<script>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { mapGetters } from 'vuex'
import ORDER from '~/gql/order/order.gql'
import ORDER_ITEM from '~/gql/order/orderItem.gql'
import OrderTracking from '~/components/Order/OrderTracking.vue'
import ReturnTracking from '~/components/Order/ReturnTracking.vue'
import NuxtLink from '~/components/NuxtLink.vue'
import DemoRequestModal from '~/components/ProductDetails/DemoRequestModal.vue'

export default {
  components: {
    OrderTracking,
    ReturnTracking,
    NuxtLink,
    DemoRequestModal,
  },

  layout: 'account',

  middleware: ['isAuth'],

  data() {
    return {
      order: null,
      deliveryBy: null,
      now: null,
      selectedProduct: null,
      showDemoScheduler: false,
    }
  },

  head() {
    return {
      title: 'Order Details',
    }
  },

  computed: {
    ...mapGetters({
      settings: 'settings',
      store: 'store',
    }),
  },

  created() {
    dayjs.extend(advancedFormat)
    this.deliveryBy = dayjs().add(7, 'day').format('dddd, MMM D, YYYY')
    this.now = dayjs()
    this.getData()
  },

  methods: {
    populateDemoScheduler(p) {
      this.selectedProduct = { id: p.id, name: p.name }
      this.showDemoScheduler = true
    },
    isReturn() {
      return (
        this.order.status === 'Return' ||
        this.order.status === 'Pickup' ||
        this.order.status === 'Refund'
      )
    },

    async getData() {
      try {
        const order = await this.$get('order/orderItem', {
          id: this.$route.query.itemId,
        })
        this.order = order
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
