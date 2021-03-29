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
        <i v-if="!isLike" class="far fa-heart like-button" @click="toggleLike"></i>
        <i v-else class="fas fa-heart like-button" :class="{ 'like': isLike }" @click="toggleLike"></i>
        <div class="price"><small>starting at</small> ${{ gig.price }}</div>
      </footer>
    </section>
</template>


<script>
// import { utilService } from '../services/util.service.js'
export default {
  props: {
    gig: {
      type: Object,
    },
    isProfile: Boolean,
  },
  data(){
    return{
      isLike:false,
    }
  },
  methods:{
    toggleLike(){
      var currGig = JSON.parse(JSON.stringify(this.gig));
      this.isLike = !this.isLike;
      currGig = {...currGig, isLike:this.isLike}
      this.$store.commit({ type:'updateGig', gig: currGig })
      this.$emit("cardLiked", currGig);
    }
  },
  computed: {
  },
  created() {
    if(this.gig.isLike){
      this.isLike = true;
    }
  },
};
</script>
