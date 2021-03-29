<template>
  <header
    class="container flex align-center app-header fixed"
    :class="{
      change_color: scrollPosition > 50 || routeName !== 'home',
      mobile_version: widthPosition < 600,
    }"
  >
    <div class="bars" @click="openNavbar">
      <i class="fas fa-bars"></i>
    </div>
    <div class="logo">
      <!-- <img src="" alt=""> TODO: Replace the H1 in IMG-->
      <router-link to="/">
        <h1>Fixerr</h1>
      </router-link>
    </div>
    <nav class="nav-links" :class="{ open_navbar: toggleNav }">
      <!-- <div class="items"> -->
        <router-link to="/gig">Explore</router-link>
        <router-link to="/gig/edit">Become a Seller</router-link>
        <router-link v-if="!getLoggedInUser" to="/login">Sign in</router-link>
        <router-link
          v-if="getLoggedInUser"
          :to="'/user/' + getLoggedInUserId + '/profile'"
          >Profile</router-link
        >
      <!-- </div> -->
    </nav>
  </header>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      filterBy: {
        name: "",
      },
      routeName: this.$route.name,
      scrollPosition: null,
      widthPosition: null,
      toggleNav: false,
    };
  },
  watch: {
    $route(to, from) {
      this.routeName = to.name;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    // window.addEventListener("resize", () => {
    //   this.widthPosition = window.innerWidth;
    //   if (this.widthPosition > 600 && window.innerWidth === 1440)
    //     document
    //       .querySelector(".app-header")
    //       .classList.remove("mobile_version");
    // });
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    openNavbar() {
      this.toggleNav = !this.toggleNav;
    },
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
