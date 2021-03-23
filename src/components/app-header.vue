<template>
  <header
    class="container app-header fixed"
    :class="{ change_color: scrollPosition > 50 || routeName !== 'home' }"
  >
    <div class="logo">
      <!-- <img src="" alt=""> TODO: Replace the H1 in IMG-->
      <router-link to="/">
        <h1>Fixerr</h1>
      </router-link>
    </div>
    <nav class="nav-links">
      <router-link to="/gig">Explore</router-link>
      <router-link to="/gig/edit">Become a Seller</router-link>
      <router-link v-if="!getLoggedInUser" to="/login">Sign in</router-link>
      <router-link
        v-if="getLoggedInUser"
        :to="'/user/' + getLoggedInUserId + '/details'"
        >Profile</router-link
      >
    </nav>
  </header>
</template>
<script>
export default {
  props: {},
  data() {
    console.log("data this.$route.name", this.$route.name);
    return {
      filterBy: {
        name: "",
      },
      routeName: this.$route.name,
      scrollPosition: null,
    };
  },
  watch: {
    $route(to, from) {
      console.log("to", to);
      console.log("from", from);
      // this.show = false;
      this.routeName = to.name;
    },
  },
  mounted() {
    // console.log("mounted this.$store", this.$store);
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  created() {
    // console.log("this.$route.name", this.$route.name);
  },
  computed: {
    getLoggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    getLoggedInUserId() {
      return this.$store.getters.loggedinUser._id;
    },
  },
};
</script>

<style>
</style>
