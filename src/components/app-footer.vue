<template>
  <footer
    class="container align-center flex app-footer"
    :class="{ 'register-page': isRegister }"
  >
    <div class="flex align-center logo">
      <!-- <img src="" alt=""> TODO: Replace the H1 in IMG-->
      <h1>Fixerr</h1>
      <p>© Fixerr International Ltd. 2021</p>
    </div>
    <div class="flex align-center nav-links">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-linkedin"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      // routeName: this.$route.name,
      isRegister: false,
    };
  },
  // watch: {
  //   $route(to, from) {
  //     this.routeName = to.name;
  //   },
  // },
  // created() {
  //   if (this.routeName === "login-signup") this.isRegister = true;
  //   else this.isRegister = false;
  // },
};
</script>

<style>
</style>