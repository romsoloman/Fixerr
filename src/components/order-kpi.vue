<template>
  <ul class="flex order-kpi-container">
    <li class="order-container">
      <section class="order-card">
        <div class="flex column order-details">
          <h2>Total Price</h2>
          <h4>${{ totalPrice }}</h4>
        </div>
      </section>
    </li>
    <li class="order-container">
      <section class="order-card">
        <div class="flex column order-details">
          <h2>Total Orders</h2>
          <h4>{{ ordersSize }}</h4>
        </div>
      </section>
    </li>
    <li class="order-container">
      <section class="order-card">
        <div class="flex column order-details">
          <h2>Avg. Price</h2>
          <h4>$ {{ avgPrice }}</h4>
        </div>
      </section>
    </li>
    <li class="order-container">
      <section class="order-card">
        <div class="flex column order-details">
          <h2>Best Buyer</h2>
          <h4>{{ bestBuyer }}</h4>
        </div>
      </section>
    </li>
  </ul>
</template>

<script>
// import orderPreview from "@/components/order-preview.vue";
export default {
  props: {
    orders: {
      type: Array,
    },
  },
  computed: {
    ordersSize() {
      return this.$store.getters.ordersSize;
    },
    totalPrice() {
      return this.$store.getters.ordersTotalForDisplay;
    },
    avgPrice() {
      return this.$store.getters.avgPrice.toFixed(2);
    },
    bestBuyer() {
      return this.$store.getters.bestBuyer;
    },
  },
  created() {},
};
</script>

<style>
</style>
