<template>
  <Modal :is-visible="show" @cancel="show = false" @confirm="show = false">
    <template #title>
      <p>Schedule Live Demo</p>
    </template>

    <form
      v-if="minDate"
      novalidate
      autocomplete="off"
      class="max-w-sm"
      @submit.stop.prevent="submit"
    >
      <p class="mb-5 text-sm">
        Schedule product demo request for {{ product && product.name }}
      </p>

      <!-- <date-picker
        v-model="schedule.scheduleDateTime"
        type="datetime"
        :disabled-date="beforeTomorrow"
      ></date-picker> -->

      <!-- <input
        id="demo-time"
        v-model="schedule.scheduleDateTime"
        type="datetime-local"
        name="demo-time"
        value="2021-06-12T19:30"
        min="2021-09-12T19:30"
        max="2021-12-14T00:00"
      /> -->

      <input
        id="demo-time"
        v-model="schedule.scheduleDateTime"
        type="datetime-local"
        name="demo-time"
        :min="minDate"
        :max="nextMonth"
        class="
          mb-5
          w-full
          p-2
          text-sm
          font-light
          placeholder-gray-400
          rounded-md
          bg-gray-50
          hover:bg-white
          transition
          duration-300
          border border-gray-300
          focus:outline-none focus:ring-0 focus:ring-offset-0
        "
      />

      <!-- <Textbox v-model="schedule.scheduleDateTime" type="date" /> -->

      <!-- <VueDatePicker
        ref="menu"
        v-model="schedule.scheduleDateTime"
        :min-date="minDate"
        placeholder="Select Schedule Date Time"
        class="shadow-md"
        @onOpen="menu = true"
        @onClose="menu = false"
      /> -->

      <!-- <VueCtkDateTimePicker
        v-model="schedule.scheduleDateTime"
        :min-date="minDate"
        :no-button-now="true"
      /> -->

      <!-- <Textbox
              id="name"
              v-model="schedule.name"
              type="text"
              placeholder="Your Name *"
              class="w-full mx-auto md:w-4/5"
              required
              autofocus
            />

            <Textbox
              id="name"
              v-model="schedule.email"
              type="text"
              placeholder="Your Email *"
              class="w-full mx-auto md:w-4/5"
              required
              autofocus
            /> -->

      <PrimaryButton
        :disabled="isDisabled"
        :loading="loading"
        class="w-full"
        type="submit"
      >
        Schedule
      </PrimaryButton>
    </form>

    <template #footer>
      <br />
    </template>
  </Modal>
</template>

<script>
import dayjs from 'dayjs'
// import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
// import DatePicker from 'vue2-datepicker'
import { mapMutations } from 'vuex'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'
import Modal from '~/components/ui/Modal.vue'
// import Textbox from '~/components/ui/Textbox.vue'
import SAVE_SCHEDULE_DEMO from '~/gql/scheduleDemo/saveScheduleDemo.gql'
// import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
// import 'vue2-datepicker/index.css'

export default {
  components: {
    PrimaryButton,
    Modal,
    // Textbox,
    // VueCtkDateTimePicker,
    // DatePicker,
  },

  props: {
    product: { type: Object, default: null },
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      minDate: null,
      loading: false,
      schedule: {
        id: 'new',
        title: 'Product demo request',
        scheduleDateTime: null,
      },
    }
  },

  computed: {
    isDisabled() {
      return !this.schedule.scheduleDateTime
    },

    settings() {
      return this.$store.state.settings || {}
    },

    user() {
      return this.$store.state.auth.user
    },
  },

  created() {
    const now = dayjs()
    const tomorrow = dayjs().add(1, 'day')
    const nextMonth = dayjs().add(30, 'day')
    this.schedule.scheduleDateTime = tomorrow.format('YYYY-MM-DDThh:mm')
    // const tomo = tomorrow.format('YYYY-MM-DDThh:mm')
    this.minDate = tomorrow.format('YYYY-MM-DDThh:mm')
    this.nextMonth = nextMonth.format('YYYY-MM-DDThh:mm') // 2021-08-08 08:08 am
    if (!this.user) {
      this.$router.push(`/login?ref=${this.$route.fullPath}`)
    }
    if (this.product) {
      this.schedule.product = this.product.id
      this.schedule.title = `Schedule product demo request for ${
        this.product && this.product.name
      }`
    }
  },

  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
    beforeTomorrow(date) {
      const today = dayjs()
      return date < today
    },

    async submit() {
      const msg = 'Schedule Done !'
      this.loading = true
      try {
        this.saveScheduleDemo = await this.$post(
          'scheduleDemo/saveScheduleDemo',
          this.schedule
        )
        // this.saveScheduleDemo = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_SCHEDULE_DEMO,
        //     variables: this.schedule,
        //   })
        // ).data.saveScheduleDemo
        // console.log('dsfsdfsdf', this.saveCustomerMessage)
        this.success(msg)
        this.$router.push(`/my/demo-requests`)
      } catch (e) {
        this.setErr(e)
      } finally {
        // this.schedule.name = ''
        // this.schedule.email = ''
        // this.schedule.message = ''
        this.loading = false
        this.$emit('hide', true)
      }
    },

    hide(e) {
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
  },
}
</script>

<style scoped></style>
