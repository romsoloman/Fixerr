<template>
  <section class="order-card">
    <h2>{{ order.buyer.username }}</h2>
  </section>
</template>

<script>
export default {
  props: {
    order: Object,
  },
};
</script>

<style>
</style>