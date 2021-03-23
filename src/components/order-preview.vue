<template>
  <section class="order-card">
    <div class="order-details">
      <p>Order#: <span>522429</span></p>
      <p>
        {{ order.createdAt }}
      </p>
    </div>
    <div class="delivery-time">
      <p>Estimated Delivery in {{ order.deliveryTime }} Days</p>
    </div>
    <div class="flex buyer-details">
      <p>From:</p>
      <img :src="order.buyer.imgUrl" alt="" />
      <p>{{ order.buyer.fullname }}</p>
    </div>
    <div class="flex price">
      <p>
        Total Price: <span>${{ order.totalPrice }}</span>
      </p>
    </div>
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