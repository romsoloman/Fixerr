<template>
  <div class="container gig-details-container" v-if="gig">
    <section class="gig-details">
      <p class="gig-title">{{ gig.title }}</p>
      <section class="main-gig-details">
        <section class="user-details">
          <img class="creator-img" :src="gig.creator.imgUrl" />
          <p class="username">{{ gig.creator.fullname }}</p>
          <p class="user-level">level {{ gig.creator.level }} <span>|</span></p>
          <p class="rating">⭐️⭐️⭐️ {{ gig.rating }}</p>
          <p class="reviews-count">({{ gig.reviews.length }})</p>
        </section>
        <section class="gig-imgs-container">
          <!-- <img class="title-img" src="">
          <img class="sub-title-img" src="">
          <img class="sub-title-img" src="">
          <img class="sub-title-img" src=""> -->
        </section>
        <div class="about-gig-container">
          <h2 class="about-gig-title">About this Gig</h2>
          <p class="about">{{ gig.about }}</p>
        </div>
        <h2 class="about-seller-title">About the seller</h2>
        <div class="about-seller-container">
          <div class="seller-img-container">
            <img class="seller-img" :src="gig.creator.imgUrl" />
          </div>
          <div class="seller-details">
            <div>
              <div class="seller-username">{{ gig.creator.fullname }}</div>
              <div class="about-user">{{ gig.creator.about }}</div>
              <div class="seller-rating">
                ⭐️⭐️⭐️ {{ gig.rating }} ({{ gig.reviews.length }} reviews)
              </div>
            </div>
            <div class="contect-button">Contact Me</div>
          </div>
        </div>
        <div class="more-on-seller">
          <div class="detail seller-from">
            <p>from</p>
            <h3>{{ gig.creator.location }}</h3>
          </div>
          <div class="detail member-since">
            <p>Member since</p>
            <h3>{{ gig.creator.memberSince }}</h3>
          </div>
          <div class="detail avg-response-time">
            <p>Avg response time</p>
            <h3>{{ gig.creator.avgResponseTime }}</h3>
          </div>
          <div class="detail last-delivery">
            <p>Last-delivery</p>
            <h3>{{ gig.creator.lastDelivery }}</h3>
          </div>
        </div>
        <div class="for-you">
          <h2>For you</h2>
          <gig-list :gigs="randomCategory"></gig-list>
        </div>
        <div class="review">
          <h2 class="review-title">Review</h2>
          <review-list
            :reviews="gig.reviews"
            @addReview="addReview"
            @removeReview="removeReview"
          />
        </div>

        <section class="package-price">
          <package-price :gig="gig"></package-price>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import packagePrice from "@/components/package-price";
import reviewList from "@/components/review-list";
import gigList from "@/components/gig-list";
import { userService } from "../services/user.service.js";
export default {
  name: "gig-details",
  data() {
    return {
      gig: null,
    };
  },
  computed: {
    getStars() {
      let stars;
      if (this.gig.rating === 1) {
        stars = "⭐️";
      } else if (this.gig.rating === 2) {
        stars = "⭐️⭐️";
      } else if (this.gig.rating === 3) {
        stars = "⭐️⭐️⭐️";
      } else if (this.gig.rating === 4) {
        stars = "⭐️⭐️⭐️⭐️";
      }
      // else{
      //   stars = '⭐️⭐️⭐️⭐️⭐'️
      // }
      return stars;
    },
    randomCategory() {
      const gigs = this.$store.getters.gigs || [];
      const randomCategory = gigs.filter((gig) => {
        return gig.tags.includes("data");
      });
      return randomCategory;
    },
  },
  created() {
    console.log("this.$store.getters.reviews", this.$store.getters.reviews);
    const gigId = this.$route.params.gigId;
    gigService.getById(gigId).then((newgig) => {
      this.gig = newgig;
      console.log("this.gig", this.gig);
    });
  },
  methods: {
    async addReview(newReview) {
      const reviewToAdd = newReview;
      reviewToAdd.by = userService.getLoggedinUser();
      this.gig.reviews.push(reviewToAdd);
      console.log("this.gig", this.gig);
      await this.$store.dispatch({
        type: "saveGigs",
        gig: JSON.parse(JSON.stringify(this.gig)),
      });
    },
    async removeReview(reviewId) {
      var reviews = this.gig.reviews;
      const idxToRemove = reviews.findIndex((review) => {
        return review.id === reviewId;
      });
      reviews.splice(idxToRemove, 1);
      this.gig.reviews = reviews;
      await this.$store.dispatch({ type: "saveGigs", gig: this.gig });
    },
  },
  components: {
    packagePrice,
    reviewList,
    gigList,
  },
};
</script>

<style>
</style>
