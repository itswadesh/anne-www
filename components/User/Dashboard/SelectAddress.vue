<template>
  <div>
    <div class="w-full rounded shadow-md border text-gray-800">
      <AddressSkeleton v-if="skeleton" />

      <div
        v-if="addresses && addresses.data && addresses.data.length == 0"
        class="p-3 sm:p-5 text-center"
      >
        No Address found
      </div>

      <div
        v-if="addresses && addresses.data && addresses.data.length"
        class="w-full"
      >
        <div
          v-for="(a, ix) in addresses && addresses.data"
          :key="ix"
          class="p-3 sm:p-5"
          :class="ix == addresses.data.length - 1 ? '' : 'border-b'"
        >
          <Radio
            v-model="selectedAddress"
            :value="a.id"
            name="group"
            class="mb-5"
            @change="addressChanged"
          >
            <div class="ms-1 sm:ms-3 w-full flex-1">
              <h5
                v-if="a.firstName"
                class="mb-2 text-sm capitalize font-semibold tracking-wide"
              >
                {{ a.firstName }}
                {{ a.lastName }}
              </h5>

              <div class="text-xs font-light flex flex-col">
                <span class="flex flex-wrap"> {{ a.address }}, </span>
                <span class="flex flex-wrap">
                  {{ a.city }}, {{ a.state }}, {{ a.country }} -
                  {{ a.zip }}</span
                >
              </div>

              <div
                v-if="a.phone"
                class="mt-2 text-xs space-x-2 whitespace-nowrap"
              >
                <span>Mobile : </span>
                <span class="font-semibold"> {{ a.phone }}</span>
              </div>

              <div
                v-if="a.email"
                class="mt-2 text-xs sm:space-x-2 whitespace-nowrap"
              >
                <span>Email : </span>
                <span class="font-semibold"> {{ a.email }}</span>
              </div>
            </div>
          </Radio>

          <div class="ms-7 sm:ms-9 flex flex-row items-center space-x-3">
            <button
              type="button"
              class="
                py-1
                px-4
                text-sm text-gray-700
                font-semibold
                hover:bg-gray-100
                border border-gray-700
                transition
                duration-300
                rounded-md
                hover:shadow-md
                uppercase
                focus:outline-none focus:ring-0 focus:ring-offset-0
                transform
                active:scale-95
              "
              @click="edit(a.id)"
            >
              Edit
            </button>

            <button
              type="button"
              class="
                py-1
                px-4
                text-sm text-gray-700
                font-semibold
                hover:bg-gray-100
                border border-gray-700
                transition
                duration-300
                rounded-md
                hover:shadow-md
                uppercase
                focus:outline-none focus:ring-0 focus:ring-offset-0
                transform
                active:scale-95
              "
              @click="del(a.id)"
            >
              <div v-if="iconloading" class="flex items-center justify-center">
                <svg
                  class="h-5 w-5 animate-spin"
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
              </div>

              <h6 v-else>Remove</h6>
            </button>
          </div>

          <!-- <div class="w-full my-auto">
            <label class="flex flex-row items-start">
              <input
                type="checkbox"
                class="
                  my-auto
                  border-0
                  rounded-sm
                  me-3
                  bg-gray-50
                  text-primary-500
                  ring-yellow-600 ring-1
                  focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0
                "
              />
              <h6 class="">Make this as a Primary address</h6>
            </label>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AddressSkeleton from '~/components/AllSkeletons/AddressSkeleton.vue'
import { Radio } from '~/shared/components/ui'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
export default {
  components: { Radio, AddressSkeleton, PrimaryButtonRounded },
  middleware: ['isAuth'],
  props: {
    id: { type: String, default: null },
    returnUrl: { type: String, default: null },
    addReturnUrl: { type: String, default: null },
  },
  data() {
    return {
      skeleton: false,
      iconloading: false,
      addresses: null,
      selectedAddress: null,
    }
  },
  head() {
    return {
      title: 'Manage Address',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      async handler(value, oldValue) {
        await this.getAddress()
      },
    },
  },
  // async created() {
  //   await this.getAddress()
  // },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    selectFirstAddress(x) {
      this.selectedAddress = x.data && x.data[0] && x.data[0].id
      return x
    },
    addressChanged(e) {
      this.selectedAddress = e
      this.$emit('addressChanged', e)
    },
    async getAddress() {
      try {
        this.skeleton = true
        // Allows users to access their address across stores. There is no store in gql
        this.addresses = await this.$get('address/myAddresses', {
          sort: '-updatedAt',
        })
        this.selectFirstAddress(this.addresses)
        // this.addresses = (
        //   await this.$apollo.query({
        //     query: MY_ADDRESSES,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.myAddresses
        // Can not push automatically, because it creates bad user experience when user clicks on back to address list page
        // if (this.addresses.count < 1) this.$router.push(this.addReturnUrl)
        // this.selectedAddress =
        //   this.addresses &&
        //   this.addresses.data &&
        //   this.addresses.data[0] &&
        //   this.addresses.data[0].id
      } catch (e) {
        // console.log('eeeeeeeeeee', e)
      } finally {
        this.skeleton = false
      }
    },
    edit(id) {
      this.$router.push(`${this.returnUrl}?id=${id}`)
    },
    del(id) {
      this.$swal({
        title: 'Delete address?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          try {
            // this.$store.commit('clearErr')
            this.clearErr()
            await this.$post('address/deleteAddress', { id })
            // await this.$apollo.mutate({
            //   mutation: DELETE_ADDRESS,
            //   variables: { id },
            //   // refetchQueries: () => [{ query: ADDRESSES }],
            // })
            // query.refetch()
            await this.getAddress()
            this.$emit('addressChanged', this.selectedAddress)
            // this.$refs.adQ.getApolloQuery().refresh();
            this.success('Address deleted successfully')
          } catch (e) {
            // this.$store.commit('setErr', e)
            this.setErr(e)
          } finally {
            // this.$store.commit('busy', false)
            this.busy(false)
          }
        }
      })
    },
  },
}
</script>

<style scoped></style>
