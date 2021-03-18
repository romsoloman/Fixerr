<template>
  <div class="gig-details-container" v-if="gig">
    <section class="gig-details">
      <p class="gig-title">{{ gig.title }} </p>
      <section class="main-gig-details">
        <section class="user-details">
          <!-- <img :src="gig.creator.imgUrl"> -->
          <p class="username">{{gig.creator.fullname}} |</p>
          <p class="rating">⭐️{{gig.rating}}</p>
          <p class="reviews-count">({{gig.reviews.length}})</p>
        </section>
        <section class="gig-imgs-container">
          <!-- <img class="title-img" src="">
          <img class="sub-title-img" src="">
          <img class="sub-title-img" src="">
          <img class="sub-title-img" src=""> -->
        </section>
        <div class="about-gig-container">
          <h2>About this Gig</h2>
          <p class="about">{{gig.about}}</p>
        </div>
        <h2>About the seller</h2>
        <div class="about-seller-container">
          <img :src="gig.creator.imgUrl">
          <div>
            <p class="username">{{gig.creator.fullname}}</p>
            <p>⭐️{{gig.rating}}</p>
            <p>Contact Me</p>
          </div>
        </div>
        <div class="more-on-seller">
          <div class="detail seller-from">
            <h3>from</h3>
            <p>{{gig.creator.location}}</p>
          </div>
          <div class="detail member-since">
            <h3>Member since</h3>
            <p>{{gig.creator.memberSince}}</p>
          </div>
          <div class="detail avg-response-time">
            <h3>Avg response time</h3>
            <p>{{gig.creator.avgResponseTime}}</p>
          </div>
          <div class="detail last-delivery">
            <h3>Last-delivery</h3>
            <p>{{gig.creator.lastDelivery}}</p>
          </div>
        </div>
        <div class="for-you">
          <h2>For you</h2>
        </div>
        <div class="review">
          <h2>Review</h2>
          <review-list :reviews="gig.reviews" @addReview="addReview" @removeReview="removeReview"/>
        </div>

        <section class="package-price">
          <package-price :gig="gig"></package-price>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import { gigService } from '../services/gig.service.js';
import packagePrice from '@/components/package-price';
import reviewList from "@/components/review-list";
import {userService} from "../services/user.service.js";
export default {
  name: "gig-details",
  data() {
    return {
       gig:null,
    }
  },
  computed:{

  },
  created() {
    console.log('this.$store.getters.reviews',this.$store.getters.reviews );
    const gigId = this.$route.params.gigId;
    gigService.getById(gigId)
      .then(newgig=>{
        this.gig = newgig;
        console.log('this.gig',this.gig );
      })
  },
  methods: {
    async addReview(newReview){
      const reviewToAdd = newReview;
      reviewToAdd.by= userService.getLoggedinUser()
      console.log('reviewToAdd',reviewToAdd );
      this.gig.reviews.push(reviewToAdd);
      await this.$store.dispatch({ type: "saveGigs", gig: this.gig })
    },
    async removeReview(reviewId){
      var reviews = this.gig.reviews;
      const idxToRemove = reviews.findIndex(review => {
        return review.id === reviewId;
      })
      reviews.splice(idxToRemove, 1);
      this.gig.reviews = reviews;
      await this.$store.dispatch({ type: "saveGigs", gig: this.gig })
    }
  },
  components:{
    packagePrice,
    reviewList
  }
};
</script>

<style>
</style>
