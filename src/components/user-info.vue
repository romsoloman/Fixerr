<template>
  <article class="flex column align-center user-info">
    <div class="flex align-center logout">
      <button @click="doLogout">Logout</button>
      <!-- <span><i class="fas fa-sign-out-alt"></i></span> -->
    </div>
    <div class="flex align-center column img">
      <img :src="user.imgUrl" alt="" />
      <p class="name">{{ user.fullname }}</p>
      <p class="level">Level {{ user.level }} Seller</p>
    </div>
    <div class="flex column notifications">
      <h1>Notifications</h1>
      <notification-list />
    </div>
  </article>
</template>

<script>
import notificationList from "./notification-list.vue";
export default {
  props: {
    user: {
      type: Object,
    },
  },
  created() {
    socketService.setup();
    socketService.on("like-addLike", this.addLike);
  },
  data() {
    return {
      likes: [],
    };
  },
  methods: {
    addLike(like) {
      this.likes.unshift(like);
    },
    doLogout() {
      this.$emit("doLogout");
    },
  },
  components: {
    notificationList,
  },
};
</script>

<style>
</style>
