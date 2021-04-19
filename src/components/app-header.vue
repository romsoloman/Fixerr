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
        <h1>Fixerr<span></span></h1>
      </router-link>
    </div>
    <nav class="nav-links" :class="{ open_navbar: toggleNav }">
      <router-link to="/gig" @click.native="openNavbar">Explore</router-link>
      <router-link to="/gig/edit" @click.native="openNavbar"
        >Become a Seller</router-link
      >
      <router-link
        v-if="!getLoggedInUser"
        to="/login"
        @click.native="openNavbar"
        >Sign in</router-link
      >
      <router-link
        v-if="getLoggedInUser"
        :to="'/user/' + getLoggedInUserId + '/profile'"
      >
        Profile
        <img v-if="getLoggedInUser" :src="getLoggedInUser.imgUrl" />
      </router-link>
      <!-- <div v-if="getLoggedInUser" class="header-img-profile">
        <img :src="getLoggedInUser.imgUrl" />
      </div> -->
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
