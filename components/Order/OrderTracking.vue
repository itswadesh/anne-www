<template>
  <div class="relative md:w-2/3">
    <div class="relative z-10">
      <div
        class="
          flex flex-col
          md:flex-row
          space-y-16
          md:space-y-0 md:items-center
          justify-start
          md:justify-between
          flex-wrap
        "
      >
        <div
          v-for="(t, tx) in order.orderHistory"
          v-if="t.index < 7 && t.public === true"
          :key="tx"
          class="flex flex-col md:items-center md:justify-center"
        >
          <div
            v-if="t.time"
            class="relative h-10 w-10 bg-primary-500 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute inset-0 text-white h-7 w-7 m-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div
            v-else
            class="
              relative
              h-10
              w-10
              bg-white
              rounded-full
              border border-black border-opacity-40
            "
          >
            <img
              v-lazy="`${t.icon}?tr=w-24,h-24,fo-auto`"
              alt=""
              class="absolute inset-0 h-6 w-6 m-1.5 opacity-40"
            />
          </div>

          <div
            class="absolute md:static left-12 md:mt-2 md:text-center"
            :class="t.time ? 'opacity-100' : 'opacity-40'"
          >
            <h4 class="font-medium">{{ t.status }}</h4>

            <h6 class="mt-1 text-sm font-light text-gray-500">
              <span v-if="t.time">
                {{ t.time | date }}
              </span>

              <span v-else class="opacity-0"> &nbsp; </span>
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        absolute
        z-0
        inset-0
        top-5
        left-5
        bottom-10
        md:bottom-0 md:left-16 md:right-14
        isolate
      "
    >
      <div
        class="
          w-1
          h-full
          md:h-1 md:w-full
          border-l-2
          md:border-l-0 md:border-t-2
          border-dotted border-primary-500
        "
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: { order: { type: Object, default: null } },
}
</script>

<style></style>
