<template>
  <section
    class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader selected="address" class="py-5 sm:py-10" />

    <div class="flex flex-col sm:items-center justify-center max-w-2xl mx-auto">
      <div class="w-full mb-3 sm:flex sm:items-center sm:justify-between">
        <h1
          class="
            mb-3
            sm:mb-0
            text-lg
            font-bold
            tracking-wide
            text-start
            max-w-max
          "
        >
          Billing Details
        </h1>

        <nuxt-link to="/checkout/address">
          <PrimaryButtonRounded
            type="button"
            :loading="loading"
            class="text-sm w-40"
            @click="loading = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>All Address</span>
          </PrimaryButtonRounded></nuxt-link
        >
      </div>

      <EditAddress id="new" :return-url="'/checkout/address'" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import EditAddress from '~/components/User/EditAddress.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
// import PriceDetails from '~/components/Cart/PriceDetails.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: {
    CheckoutHeader,
    EditAddress,
    PrimaryButtonRounded,
    // PriceDetails,
  },
  middleware: ['isAuth'],
  data() {
    return {
      address: null,
      loading: false,
    }
  },
  head() {
    return {
      title: 'Add Address',
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  async created() {
    // const id = this.$route.query.id
    // If editing
    // if (!id) {
    //   let geoCookie = this.$cookies.get('geo')
    //   if (geoCookie) {
    //     this.address = geoCookie || {}
    //     this.address.firstName = this.user.firstName
    //     this.address.lastName = this.user.lastName
    //     this.address.phone = this.user.phone
    //   }
    // }
  },

  methods: {
    // go(url) {
    //   this.$router.push(url)
    // },
    // async submit(address) {
    //   if (address && address.coords) delete address.coords.__typename
    //   try {
    //     // address.zip = +address.zip
    //     if (address.id)
    //       await this.$apollo.mutate({
    //         mutation: updateAddress,
    //         variables: address,
    //       })
    //     else
    //       await this.$apollo.mutate({
    //         mutation: addAddress,
    //         variables: address,
    //       })
    //     this.go('/checkout/address')
    //   } catch (e) {
    //   } finally {
    //   }
    // },
  },
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
</style>
