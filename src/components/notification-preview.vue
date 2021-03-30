
<template>
  <section class="flex msg-container" v-if="notification">
    <header>
      <div class="user-notification">
        <img :src="notification.userThatLiked.imgUrl" alt="" />
        <p>{{ notification.userThatLiked.fullname }}</p>
      </div>
    </header>
    <div class="notification-msg">
      <p>
        {{ notification.userThatLiked.fullname }} liked
        {{ notification.likedGig.creator.fullname }}'s gig.
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    notification: Object,
  },
  created() {},
};
</script>
