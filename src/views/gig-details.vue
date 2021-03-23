<template>
  <loader v-if="isLoadingGig"/>
  <div class="container gig-details-container container" v-else-if="gig">
    <section class="gig-details">
      <p class="gig-title">{{ gig.title }}</p>
      <section class="main-gig-details">
        <section class="user-details">
          <img class="creator-img" :src="gig.creator.imgUrl" />
          <p class="username">{{ gig.creator.fullname }}</p>
          <p class="user-level">Level {{ gig.creator.level }} <span>|</span></p>
          <p class="rating">{{ getStars }} {{ gig.rating }}</p>
          <p class="reviews-count">({{ gig.reviews.length }})</p>
        </section>
        <section class="gig-imgs-container container">
          <div class="main-img-container">
            <img class="main-img" :src="mainImg" alt="" />
          </div>
          <div class="sub-img-container">
            <img
              class="sub-img"
              :src="gig.imgUrls[0]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[0] }"
              @click="changeMainImg(0)"
              alt=""
            />
            <img
              class="sub-img"
              :src="gig.imgUrls[1]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[1] }"
              @click="changeMainImg(1)"
              alt=""
            />
            <img
              class="sub-img"
              :src="gig.imgUrls[2]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[2] }"
              @click="changeMainImg(2)"
              alt=""
            />
            <img
              class="sub-img"
              :src="gig.imgUrls[3]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[3] }"
              @click="changeMainImg(3)"
              alt=""
            />
          </div>
        </section>
        <div class="about-gig-container container">
          <h2 class="about-gig-title">About this Gig</h2>
          <p class="about">{{ gig.about }}</p>
        </div>
        <h2 class="about-seller-title">About the seller</h2>
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
          </div>
        </div>
        <div class="more-on-seller">
          <div class="detail seller-from">
            <p>From</p>
            <h3>{{ gig.creator.location }}</h3>
          </div>
          <div class="detail member-since">
            <p>Member since</p>
            <h3>{{ getTimeOfMemberSince }}</h3>
          </div>
          <div class="detail avg-response-time">
            <p>Avg response time</p>
            <h3>{{ gig.creator.avgResponseTime }}</h3>
          </div>
          <div class="detail last-delivery">
            <p>Last delivery</p>
            <h3>{{ gig.creator.lastDelivery }}</h3>
          </div>
        </div>
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
import loader from "@/components/loader";
import { gigService } from "../services/gig.service.js";
import packagePrice from "@/components/package-price";
import reviewList from "@/components/review-list";
import gigList from "@/components/gig-list";
import reviewsStats from "@/components/reviews-stats";
import { userService } from "../services/user.service.js";
import moment from "moment";
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
      // return avgReviews.toFixed(2);
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
    getTimeOfMemberSince() {
      if (this.gig.creator.memberSince) {
        let currTime;
        currTime = moment(this.gig.creator.memberSince).fromNow(); // 3 days ago
        return currTime;
      }
    },
  },
  created() {
    const gigId = this.$route.params.gigId;
    // this.isLoadingGig = true;
    console.log('Created!!');
    gigService.getById(gigId).then((newGig) => {
      this.gig = newGig;
      this.mainImg = this.gig.imgUrls[0];
      console.log('getById is done!!');
    }).finally(() => {
      console.log('getById in finally!!');
      console.log('this', this);
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
    loader
  },
};
</script>

<style>
</style>
