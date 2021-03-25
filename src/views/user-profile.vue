<template>
  <loader v-if="isLoadingUser"/>
  <section v-else-if="user" class="container user-details-container">
    <user-info :user="user" @doLogout="doLogout"/>
    <user-dashboard :user="user" :gigs="gigs" :orders="orders" />
    <notification-list :likes="likes"/>
  </section>
</template>

<script>
import userInfo from "@/components/user-info";
import userDashboard from "@/components/user-dashboard";
import loader from "@/components/loader";
import { userService } from "../services/user.service.js";
import chart from "@/components/chart.vue";
import notificationList from '@/components/notification-list';
export default {
  data() {
    return {
      user: null,
      isLoadingUser:true,
      likes:[]
    };
  },
  created() {
    socketService.setup();
    socketService.on("like-addLike", this.addLike);
    const userId = this.$route.params.userId;
    userService.getById(userId).then((newUser) => {
      console.log("newUser", newUser);
      this.user = newUser;
    }).finally(() => {
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
    addLike(like) {
      this.likes.unshift(like);
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  components: {
    chart,
    loader,
    userInfo,
    userDashboard,
    notificationList
  },
};
</script>

<style>
</style>
