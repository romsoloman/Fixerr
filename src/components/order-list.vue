<template>
  <ul class="container order-list-container">
    <li class="order-container" v-for="order in orders" :key="order._id">
      <order-preview :order="order" />
    </li>
  </ul>
</template>

<script>
import orderPreview from "@/components/order-preview.vue";
export default {
  props: {
    orders: {
      type: Array,
    },
  },
  components: {
    orderPreview,
  },
  created() {},
};
</script>

<style>
</style>
