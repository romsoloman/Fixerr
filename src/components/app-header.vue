<template>
  <header
    class="container app-header"
    :class="{ change_color: scrollPosition > 50 }"
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
      <router-link v-if="!getLoggedInUser" to="/login">Join</router-link>
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
  data() {
    return {
      filterBy: {
        name: "",
      },
      scrollPosition: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  created() {},
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
