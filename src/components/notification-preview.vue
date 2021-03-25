
<template>
  <section class="flex msg-container" v-if="like">
    <header>
      <div class="user-liked">
        <img :src="like.currUser.imgUrl" alt="" />
        <p>{{ like.currUser.fullname }}</p>
      </div>
    </header>
    <div class="like-msg">
      <p>
        {{ like.currUser.fullname }} Liked {{ like.creator.fullname }}'s gig.
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    like: Object,
  },
  computed: {},
};
</script>
