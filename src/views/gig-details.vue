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
        <div class="about-seller-container">
          <h2>About the seller</h2>
          <!-- <img :src="gig.creator.imgUrl"> -->
          <p class="username">{{gig.creator.fullname}}</p>
          <p>⭐️{{gig.rating}}</p>
          <p>Contact Me</p>
        </div>
        <div class="more-on-seller">
          <div class="seller-from">
            <h3>from</h3>
            <p>{{gig.creator.location}}</p>
          </div>
          <div class="member-since">
            <h3>Member since</h3>
            <p>{{gig.creator.memberSince}}</p>
          </div>
          <div class="avg-response-time">
            <h3>Avg response time</h3>
            <p>{{gig.creator.avgResponseTime}}</p>
          </div>
          <div class="last-delivery">
            <h3>Last-delivery</h3>
            <p>{{gig.creator.lastDelivery}}</p>
          </div>
        </div>
        <div class="for-you">
          <h2>For you</h2>
        </div>
        <div class="review">
          <h2>Review</h2>
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
export default {
  name: "gig-details",
  data() {
    return {
       gig:null,
    }
  },
  created() {
     const gigId = this.$route.params.gigId;
    gigService.getById(gigId)
      .then(newgig=>{
        this.gig = newgig;
        console.log('this.gig',this.gig );
      })
  },
  methods: {
  },
  components:{
    packagePrice
  }
};
</script>

<style>
</style>
