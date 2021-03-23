<template>
  <loader v-if="isLoadingGig"/>
  <div class="container gig-details-container container" v-else-if="gig">
    <section class="gig-details">
      <p class="gig-title">{{ gig.title }}</p>
      <section class="main-gig-details">
        <gig-user-details :gig="gig"/>
        <gig-details-imgs :gig="gig" @changeMainImg="changeMainImg"/>
        <div class="about-gig-container container">
          <h2 class="about-gig-title">About this Gig</h2>
          <p class="about">{{ gig.about }}</p>
        </div>
        <h2 class="about-seller-title">About the seller</h2>
        <gig-about-seller-details :gig="gig"/>
        <gig-seller-details :gig="gig"/>
        <div class="for-you">
          <h2>For you</h2>
          <gig-list :gigs="randomCategory"></gig-list>
        </div>
        <section class="review">
          <h2 v-if="gig.reviews.length === 0">Reviews</h2>
          <h2 v-else class="review-title">
            {{ gig.reviews.length }} Review
            <span class="avg-rat"> {{ getAvgRat }}</span>
          </h2>
          <reviews-stats v-if="gig.reviews.length > 0" :gig="gig" />
          <review-list
            :reviews="gig.reviews"
            @addReview="addReview"
            @removeReview="removeReview"
          />
        </section>

        <section class="package-price">
          <package-price :gig="gig"></package-price>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import gigSellerDetails from "@/components/gig-seller-details";
import gigAboutSellerDetails from "@/components/gig-about-seller-details";
import loader from "@/components/loader";
import { gigService } from "../services/gig.service.js";
import packagePrice from "@/components/package-price";
import gigUserDetails from "@/components/gig-user-details";
import reviewList from "@/components/review-list";
import gigList from "@/components/gig-list";
import reviewsStats from "@/components/reviews-stats";
import gigDetailsImgs from "@/components/gig-details-imgs";
import { userService } from "../services/user.service.js";
export default {
  name: "gig-details",
  data() {
    return {
      gig: null,
      mainImg: null,
      isLoadingGig: true
    };
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
    getAvgRat() {
      // TODO-getAvgRat - 62
      let reviewSum = this.gig.reviews.reduce((acc, review) => {
        acc += review.rate;
        return acc;
      }, 0);

      const avgReviews = reviewSum / this.gig.reviews.length;
      let stars;
      if (avgReviews >= 0 && avgReviews <= 0.5) {
        stars = "✩✩✩✩✩";
      } else if (avgReviews >= 0.5 && avgReviews <= 1.5) {
        stars = "★✩✩✩✩";
      } else if (avgReviews >= 1.5 && avgReviews <= 2.5) {
        stars = "★★✩✩✩";
      } else if (avgReviews >= 2.5 && avgReviews <= 3.5) {
        stars = "★★★✩✩";
      } else if (avgReviews >= 3.5 && avgReviews <= 4.5) {
        stars = "★★★★✩";
      } else if (avgReviews >= 4.5) {
        stars = "★★★★★";
      }
      return stars + " " + avgReviews.toFixed(2);
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
    const gigId = this.$route.params.gigId;
    gigService.getById(gigId).then((newGig) => {
      this.gig = newGig;
    }).finally(() => {
      this.isLoadingGig = false;
    });
  },
  methods: {
    changeMainImg(imgIdx) {
      this.mainImg = this.gig.imgUrls[imgIdx];
    },
    getStarsOfReviews() {
      const reviewsAvg = getAvgRat();
      return reviewsAvg;
    },
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
    reviewsStats,
    loader,
    gigDetailsImgs,
    gigUserDetails,
    gigAboutSellerDetails,
    gigSellerDetails
  },
};
</script>

<style>
</style>
