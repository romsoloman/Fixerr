<template>
  <loader v-if="isLoadingUser" />
  <section v-else-if="user" class="container user-details-container">
    <user-info :user="user" @doLogout="doLogout" />
    <user-dashboard :user="user" :gigs="gigs" :orders="orders" />
  </section>
</template>

<script>
import userInfo from "@/components/user-info";
import userDashboard from "@/components/user-dashboard";
import loader from "@/components/loader";
import { userService } from "../services/user.service.js";
export default {
  data() {
    return {
      user: null,
      isLoadingUser: true,
    };
  },
  created() {
    window.scrollTo(0, 0);
    const userId = this.$route.params.userId;
    userService
      .getById(userId)
      .then((newUser) => {
        console.log("newUser", newUser);
        this.user = newUser;
      })
      .finally(() => {
        this.isLoadingUser = false;
      });
    this.$store.dispatch({ type: "loadOrders", userId });
    this.$store.dispatch({ type: "loadGig", userId });
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
    gigs() {
      return [this.$store.getters.gig];
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  components: {
    loader,
    userInfo,
    userDashboard,
  },
};
</script>

<style>
</style>
