<template>
  <section
    class="
      flex flex-col
      items-center
      justify-center
      min-h-screen
      p-2
      text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <!-- Email login start  -->

    <div
      class="
        px-4
        sm:px-8
        py-10
        flex flex-col
        border
        rounded-2xl
        shadow-2xl
        frosted
        w-full
        max-w-sm
      "
    >
      <!-- Store name  -->

      <nuxt-link
        to="/"
        class="
          mb-5
          text-4xl
          font-extrabold
          text-transparent
          bg-clip-text bg-gradient-to-br
          from-secondary-500
          to-primary-500
          text-center
        "
      >
        <span v-if="store.name">
          {{ store.name }}
        </span>

        <span v-else> {{ settings.websiteName }} </span>
      </nuxt-link>

      <h6 class="mb-3 text-gray-600 text-center">
        Please login using email and password
      </h6>

      <form @submit.prevent="submit">
        <Textbox
          id="email"
          v-model="email"
          class="mb-3 w-full"
          type="email"
          required
          autofocus
          placeholder="Enter your email"
        />

        <div class="relative">
          <Textbox
            id="password"
            v-model="password"
            :type="type"
            class="mb-2 w-full"
            required
            autofocus
            placeholder="Password"
          />

          <button
            type="button"
            class="
              absolute
              right-0
              inset-y-0
              mx-3
              my-auto
              text-gray-500
              focus:outline-none focus:ring-0 focus:ring-offset-0
            "
            @click="togglePassword()"
          >
            <svg
              v-if="showPassword"
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
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>

            <svg
              v-else
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        <div class="mb-5 flex justify-end">
          <nuxt-link
            to="/account/forgot-password"
            class="
              max-w-max
              text-xs
              font-light
              hover:underline hover:text-gray-800
              focus:outline-none
              text-end
            "
          >
            Forgot Password?
          </nuxt-link>
        </div>

        <PrimaryButtonRounded
          class="mb-5 w-full max-w-sm mx-auto"
          type="submit"
          :loading="loading"
        >
          LOGIN
        </PrimaryButtonRounded>
      </form>

      <div
        class="
          w-full
          max-w-sm
          mx-auto
          flex flex-row
          items-center
          justify-between
        "
      >
        <nuxt-link
          :to="`/otplogin?ref=${$route.query.ref}`"
          class="
            text-start text-primary-500
            hover:text-primary-700 hover:underline
            max-w-max
          "
        >
          Login with phone
        </nuxt-link>

        <nuxt-link
          :to="`/account/signup?ref=${$route.query.ref}`"
          class="
            text-end text-primary-500
            hover:text-primary-700 hover:underline
            max-w-max
          "
        >
          Not a Member yet?
        </nuxt-link>
      </div>

      <!-- OR  -->

      <!-- <div class="mb-8 flex flex-row w-full">
        <span class="w-1/2 border-t border-gray-400"></span>
        <span class="mx-3 my-auto -mt-3">or</span>
        <span class="w-1/2 border-t border-gray-400"></span>
      </div> -->

      <!-- Facebook login -->

      <div
        class="
          mt-4
          flex flex-row
          items-center
          justify-center
          space-x-2
          md:space-x-4
        "
      >
        <a
          href="/auth/facebook"
          class="
            p-2.5
            w-full
            flex-1 flex
            items-center
            justify-center
            text-xs
            space-x-2
            transition
            duration-300
            border
            rounded-md
            shadow-md
            cursor-pointer
            hover:shadow-lg
          "
        >
          <img src="/img/social-media/facebook-48.png" alt="" class="h-5 w-5" />

          <span>Facebook</span>
        </a>

        <!-- Google login -->

        <a
          href="/auth/google"
          class="
            p-2.5
            w-full
            flex-1 flex
            justify-center
            items-center
            text-xs
            space-x-2
            transition
            duration-300
            border
            rounded-md
            shadow-md
            cursor-pointer
            hover:shadow-lg
          "
        >
          <img src="/img/social-media/google-48.png" alt="" class="h-5 w-5" />

          <span>Google</span>
        </a>
      </div>
    </div>

    <!-- Email login end -->
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
import SignupStep from '~/components/Login/Email/SignupStep.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import { Textbox } from '~/shared/components/ui'

export default {
  components: {
    NuxtLink,
    SignupStep,
    PrimaryButtonRounded,
    Textbox,
  },

  layout: 'none',

  middleware: ['isGuest', 'isEmailLogin'],
  data() {
    return {
      error: null,
      otp: false,
      signup: false,
      loading: false,
      email: null,
      password: null,
      resetpassword: false,
      otplogin: false,
      isMounted: false,
      type: 'password',
      showPassword: false,
    }
  },

  head() {
    return {
      title: `Login | ${this.store.name || ''}`,
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    store() {
      return this.$store.state.store || {}
    },
  },
  mounted() {
    this.isMounted = true
    const googleOneTap = require('google-one-tap')
    const options = {
      client_id: this.settings.GOOGLE_CLIENT_ID, // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: 'signin', // optional
    }
    googleOneTap.default(options, async (response) => {
      //   // Send response to server
      const onetap = await this.$post('user/googleOneTap', response)
      await this.$store.dispatch('auth/fetch')
      await this.$store.dispatch('cart/fetch')
    })
  },

  methods: {
    ...mapMutations({
      setErr: 'setErr',
      success: 'success',
    }),

    ...mapActions({
      login: 'auth/login',
    }),

    async submit() {
      const msg = 'Login success'
      try {
        this.loading = true
        if (this.email && this.password) {
          await this.login({
            email: this.email,
            password: this.password,
          })
        } else {
          this.setErr('invalid information')
        }
        this.success(msg)
        const r = this.$route.query.ref || '/'
        this.$router.push(r)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword

      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
  },
}
</script>

<style scoped>
.frosted {
  background-image: url('/login/bg-lighter.svg');
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
