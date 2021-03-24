<template>
   <div class="about-seller-container">
      <div class="seller-img-container">
        <img class="seller-img" :src="gig.creator.imgUrl" />
        <img class="badge" src="../assets/imgs/badge.svg" alt="" />
      </div>
      <div class="seller-details">
        <div>
          <div class="seller-username">{{ gig.creator.fullname }}</div>
          <div class="about-user">{{ gig.creator.about }}</div>
          <div class="seller-rating">
            <span class="rating">{{ getStars }} {{ gig.rating }}</span> ({{
              gig.reviews.length
            }}
            reviews)
          </div>
        </div>
        <div class="contect-button">Contact Me</div>
        <app-chat/>
      </div>
    </div>
</template>
<script>
import appChat from "@/components/app-chat";
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
  components:{
    appChat
  }
};
</script>

<style>
</style>
