<template>
  <article class="user-dashboard">
    <div class="flex column justify-center welcome">
      <p class="welcome-msg">Welcome back {{ user.fullname }}!</p>
      <p>
        You've sold 80% of your goal this week! Keep it up and improve your
        results!
      </p>
    </div>
    <div class="orders">
      <h1>My Orders</h1>
      <order-list :orders="orders"></order-list>
    </div>
    <div class="gigs">
      <h1>My Gigs</h1>
      <gig-list :gigs="gigs" :isProfile="true"></gig-list>
    </div>
  </article>
</template>

<script>
import orderList from "@/components/order-list.vue";
import gigList from "@/components/gig-list.vue";
export default {
  props: {
    user: {
      type: Object,
    },
    orders: {
      type: Array,
    },
    gigs: {
      type: Array,
    },
  },
  components: {
    orderList,
    gigList,
  },
};
</script>

<style>
</style>
