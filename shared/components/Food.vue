<template>
  <div class="product">
    <div v-if="'/images' + product.imgCdn" class="image pull-up">
      <img v-lazy="`${product.imgCdn}?tr=w-300,h-200,fo-auto`" alt="" />
    </div>
    <div class="product-name">
      <strong>{{ product.name }}</strong>
      <div class="fx">
        <div class="variants">
          <strong>Qty: {{ product.qty }}</strong>
        </div>
      </div>

      <div class="price">
        <div class="font-bold">
          Price :
          {{
            product.price
              | currency(store.currencySymbol, store.currencyDecimals)
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    product: { type: Object, default: () => {} },
    showcart: { type: String, default: null },
  },

  // ['product', 'showcart'], // Used to hide the buttons at cart order page
  computed: { ...mapGetters({ store: 'store' }) },
}
</script>

<style scoped>
.product {
  align-items: flex-start;
  display: flex;
  text-align: left;
  padding-top: 1rem;
}
.product-name {
  flex: 1;
  margin-top: 5px;
  line-height: 1.2rem;
  padding-left: 1rem;
}
strong {
  color: #363636;
  font-weight: 700;
  font-size: 1rem;
}
.image {
  width: 139px;
}
.image img {
  border-radius: 12px;
}
.border {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
.price {
  margin-top: 5px;
}
.font-bold {
  font-size: 1.2rem;
  font-weight: 700;
}
.head {
  position: relative;
  left: 0;
  right: 0;
  text-align: center;
  margin-bottom: 50px;
}
.m-left {
  margin-left: 2rem;
}
</style>
