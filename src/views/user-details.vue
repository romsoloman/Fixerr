<template>
  <section v-if="user" class="container user-details-container">
    <article class="flex column align-center user-info">
      <div class="flex logout">
        <button @click="doLogout">Logout</button>
        <!-- <span><i class="fas fa-sign-out-alt"></i></span> -->
      </div>
      <div class="flex align-center column img">
        <img :src="user.imgUrl" alt="" />
        <p class="name">{{ user.fullname }}</p>
        <p class="level">Level {{ user.level }} Seller</p>
      </div>
    </article>
    <article class="user-dashboard">
      <div class="flex column justify-center welcome">
        <p class="welcome-msg">Welcome back {{ user.fullname }}!</p>
        <p>
          You've sold 80% of your goal this week! Keep it up and improve your
          results!
        </p>
      </div>
      <div class="orders">
        <!-- ORDERS LIST CMP -->
        <h1>My Orders</h1>
        <order-list :orders="orders"></order-list>
      </div>
      <div class="gigs">
        <!-- GIGS CREATED BY USER -->
        <h1>My Gigs</h1>
      </div>
    </article>
  </section>
</template>

<script>
import { userService } from "../services/user.service.js";
import chart from "@/components/chart.vue";
import orderList from "@/components/order-list.vue";
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    const userId = this.$route.params.userId;
    userService.getById(userId).then((newUser) => {
      console.log("newUser", newUser);
      this.user = newUser;
    });
    this.$store.dispatch({ type: "loadOrders", userId });
  },
  computed: {
    gigsCountes() {
      const gigs = this.user.orders;
      gigs.reduce((acc, gig) => {
        if (!acc[gig.price]) acc[gig.price] = 0;
        acc[gig.price]++;
        return acc;
      }, {});
    },
    orders() {
      return this.$store.getters.orders;
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  components: {
    chart,
    orderList,
  },
};
</script>

<style>
</style>
