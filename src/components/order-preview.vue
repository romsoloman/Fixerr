<template>
  <section class="order-card">
    <div class="order-details">
      <p>Order#: <span>522429</span></p>
      <p>
        {{ moment(order.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a") }}
      </p>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      moment,
    };
  },
  props: {
    order: Object,
  },
};
</script>

<style>
</style>