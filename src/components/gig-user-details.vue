<template>
    <section class="user-details">
      <img class="creator-img" :src="gig.creator.imgUrl" />
      <p class="username">{{ gig.creator.fullname }}</p>
      <p class="user-level">Level {{ gig.creator.level }} <span>|</span></p>
      <p class="rating">{{ getStars }} {{ gig.rating }}</p>
      <p class="reviews-count">({{ gig.reviews.length }})</p>
    </section>
</template>
<script>
export default {
  props: {
      gig: Object,
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
     getStars() {
      // TODO-GETSTARS - 10
      let stars;
      if (this.gig.rating >= 0 && this.gig.rating <= 0.5) {
        stars = "✩✩✩✩✩";
      } else if (this.gig.rating >= 0.5 && this.gig.rating <= 1.5) {
        stars = "★✩✩✩✩";
      } else if (this.gig.rating >= 1.5 && this.gig.rating <= 2.5) {
        stars = "★★✩✩✩";
      } else if (this.gig.rating >= 2.5 && this.gig.rating <= 3.5) {
        stars = "★★★✩✩";
      } else if (this.gig.rating >= 3.5 && this.gig.rating <= 4.5) {
        stars = "★★★★✩";
      } else if (this.gig.rating >= 4.5) {
        stars = "★★★★★";
      }
      return stars;
    },
  },
};
</script>

<style>
</style>
