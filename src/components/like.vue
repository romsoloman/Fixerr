<template>
   <section class="like-msg-container" v-if="currLike&&showLikeMsg">
      <header>
        <div class="user-made-like">
          <img :src="currLike.currUser.imgUrl" alt="">
          <p>{{currLike.currUser.fullname}}</p>
        </div>
        <p>NEW</p>
      </header>
      <div class="like-msg">{{currLike.currUser.fullname}} Liked {{currLike.creator.fullname}}'s gig</div>
    </section>
</template>
<script>

export default {
  props: {
      currLike: Object,
      showLikeMsg:Boolean
    },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {

  },
  created() {

  },
  computed: {

  },
};
</script>

<style>
</style>
