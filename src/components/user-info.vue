<template>
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
      <div class="notifications">
        <h1>Notifications</h1>
      </div>
    </article>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
    created() {

    },
  methods:{
    doLogout() {
      this.$emit("doLogout");
    },
  },
  components: {
  },
};
</script>

<style>
</style>
