<template>
  <router-link class="gig-details-link" :to="'/gig/'+gig._id+'/details'">
    <section class="card-container">
      <header>
        <div class="img-container">
          <img class="gig-img" :src="gig.imgUrls[0]" />
        </div>
      </header>
      <main class="main-info">
        <div class="user-details">
          <img class="user-img"/>
          <p class="user-name">{{ gig.creator.fullname }}</p>
          <p class="user-level">{{ gig.creator.level }}</p>
        </div>
        <p class="gig-description">{{ gig.about }}</p>
        <div class="rating-info">
          <div class="stars">{{ gig.rating }}</div>
          <!-- <div class="reviews-count">{{ gig.reviews.length }}</div> -->
        </div>
      </main>
      <footer class="footer-info">
        <div class="like">❤️</div>
        <div class="price">{{ gig.price }}$</div>
      </footer>
    </section>
  </router-link>
</template>


<script>
// import { utilService } from '../services/util.service.js'
export default {
  props: {
    gig: Object,
  },
  computed: {},
};
</script>
