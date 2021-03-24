<template>
    <section class="card-container" :class="{ 'profile-card': isProfile }">
      <router-link class="gig-details-link" :to="'/gig/' + gig._id + '/details'">
      <header>
        <img class="gig-img" :src="gig.imgUrls[0]" />
      </header>
      <main class="main-info">
        <div class="flex align-center user-details">
          <img :src="gig.creator.imgUrl" class="user-img" />
          <div class="user-info">
            <p class="user-name">{{ gig.creator.fullname }}</p>
            <p class="user-level">Level {{ gig.creator.level }} Seller</p>
          </div>
        </div>
        <p class="gig-description">{{ gig.title }}</p>
        <div class="flex rating-info">
          <span><i class="fas fa-star"></i></span>
          <div class="stars">{{ gig.rating }}</div>
          <span class="reviews-count">({{ gig.reviews.length }})</span>
        </div>
      </main>
      </router-link>
      <footer class="flex align-center footer-info">
        <i v-if="!isLiked" class="far fa-heart like-button" @click="toggleLike"></i>
        <i v-else class="fas fa-heart like-button" :class="{ 'like': isLiked }" @click="toggleLike"></i>
        <div class="price"><small>starting at</small> ${{ gig.price }}</div>
      </footer>
    </section>
</template>


<script>
// import { utilService } from '../services/util.service.js'
export default {
  props: {
    gig: {
      gig: Object,
    },
    isProfile: Boolean,
  },
  data(){
    return{
      isLiked:false,
    }
  },
  methods:{
    toggleLike(){
      this.isLiked = !this.isLiked
      if(this.isLiked){
        this.$emit("cardLiked", this.gig);
      }
    }
  },
  computed: {},
  created() {},
};
</script>
