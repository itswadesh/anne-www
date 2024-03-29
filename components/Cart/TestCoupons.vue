<template>
  <Modal :is-visible="show" @cancel="$emit('hide')" @confirm="show = false">
    <template #title>
      <p>Apply Coupon</p>
    </template>

    <div>
      <form
        novalidate
        autocomplete="off"
        class="
          relative
          flex flex-row
          items-center
          justify-between
          space-x-3
          sm:space-x-5
          mb-5
        "
        @submit.stop.prevent="applyOffer(coupon_code)"
      >
        <input
          v-model="coupon_code"
          type="text"
          placeholder="Enter coupon Code"
          class="py-2 px-4 w-full my-auto text-sm rounded-md border-gray-300"
        />

        <TransparentButton
          type="submit"
          border
          loadingringsize="sm"
          class="px-6 text-sm"
        >
          Apply
        </TransparentButton>
      </form>

      <div v-if="coupons" class="h-56 mb-5 overflow-y-auto">
        <div v-for="c in coupons.data" :key="c.id">
          <label class="flex flex-row mb-3 bg-gray-100">
            <Radio v-model="coupon_code" :value="c.code" />
            <div class="flex flex-col ms-2">
              <div
                class="
                  w-1/3
                  p-1
                  text-center
                  bg-white
                  text-primary-500
                  hover:shadow-lg
                "
              >
                {{ c.code }}
              </div>
              <div class="mt-3 text-xs font-medium text-gray-700">
                Save up to
                {{
                  c.maxAmount
                    | currency(store.currencySymbol, store.currencyDecimals)
                }}
              </div>
              <div class="mt-3 text-xs font-medium text-gray-700">
                {{ c.text }} on minimum purchase of
                {{
                  c.minimumCartValue
                    | currency(store.currencySymbol, store.currencyDecimals)
                }}
                | Expires on {{ c.validToDate | date }}
                {{ c.terms }}
              </div>
            </div>
          </label>
        </div>
      </div>

      <form
        novalidate
        autocomplete="off"
        class="flex flex-col justify-between md:flex-row"
        @submit.stop.prevent="applyOffer(coupon_code)"
      >
        <div class="my-auto text-sm text-gray-500">
          <!-- Minimum saving {{ 125 | currency(store.currencySymbol,2) }} -->
        </div>

        <PrimaryButtonRounded type="submit" :disabled="disabled" class="w-full">
          <div v-if="saving" class="flex items-center justify-center">
            <svg
              class="h-5 w-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            <span class="mx-2 text">Applying...</span>
          </div>

          <span v-else>APPLY</span>
        </PrimaryButtonRounded>
      </form>
    </div>

    <template #footer>
      <br />
    </template>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import COUPONS from '~/gql/cart/coupons.gql'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import TransparentButton from '~/components/ui/TransparentButton.vue'
import Radio from '~/shared/components/ui/Radio.vue'
import Modal from '~/components/ui/Modal.vue'

export default {
  components: {
    PrimaryButtonRounded,
    TransparentButton,
    Radio,
    Modal,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      coupon_code: null,
      coupons: null,
      loading: false,
      disabled: false,
      saving: false,
    }
  },

  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },

  created() {
    this.getCoupons()
  },

  methods: {
    ...mapActions({ applyCoupon: 'cart/applyCoupon' }),

    async applyOffer(code) {
      try {
        this.disabled = true
        this.saving = true
        await this.applyCoupon({ code })
        this.$emit('hide')
      } catch (e) {
      } finally {
        this.saving = false
        this.disabled = false
      }
    },

    async getCoupons() {
      try {
        this.loading = true
        this.coupons = (
          await this.$apollo.query({
            query: COUPONS,
            fetchPolicy: 'no-cache',
          })
        ).data.coupons
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    hide(e) {
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
