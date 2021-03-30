<template>
  <section class="hero-app">
    <div class="hero-backgrounds">
      <img :class="{ 'visible': currentVisibleImageIndex === 0 }" :src="require('../assets/imgs/bg-hero-1.png')" />
      <img :class="{ 'visible': currentVisibleImageIndex === 1 }" :src="require('../assets/imgs/bg-hero-2.png')" />
      <img :class="{ 'visible': currentVisibleImageIndex === 2 }" :src="require('../assets/imgs/bg-hero-3.png')" />
      <img :class="{ 'visible': currentVisibleImageIndex === 3 }" :src="require('../assets/imgs/bg-hero-4.png')" />
      <img :class="{ 'visible': currentVisibleImageIndex === 4 }" :src="require('../assets/imgs/bg-hero-5.png')" />
    </div>
    <div class="container hero-container">
      <h1 class="title">
        Find the perfect <i>freelance</i> services for your business
      </h1>
      <form class="search-box">
        <div class="search">
          <div class="flex justify-center align-center search-icon">
            <i class="fas fa-search"></i>
          </div>
          <input
            type="text"
            placeholder="Try  'Music and Audio'"
            v-model="filterBy.name"
            class="search-input"
          />
          <router-link
            class="flex justify-center align-center search-button"
            :to="{ name: 'gig', params: { filterBy } }"
          >
            Search
          </router-link>
        </div>
        <div class="popular-search">
          <span>Popular:</span>
          <router-link :to="{ name: 'gig', params: { filterBy: 'data' } }">
            Data
          </router-link>
          <router-link :to="{ name: 'gig', params: { filterBy: 'gaming' } }">
            Gaming
          </router-link>
          <router-link
            :to="{ name: 'gig', params: { filterBy: 'programming and tech' } }"
          >
            Programming and Tech
          </router-link>
          <router-link
            :to="{ name: 'gig', params: { filterBy: 'digital marketing' } }"
          >
            Digital Marketing
          </router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
        price: {
          minPrice: 0,
          maxPrice: 5000,
        },
        rating: 0,
        level: 0,
      },
      currentVisibleImageIndex: 0,
      mainImageSrc: "bg-hero-1.png",
    };
  },
  created() {
    let self = this;
    this.images = [
      {
        id: "2",
        image: "bg-hero-2.png",
      },
      {
        id: "3",
        image: "bg-hero-3.png",
      },
      {
        id: "4",
        image: "bg-hero-4.png",
      },
      {
        id: "5",
        image: "bg-hero-5.png",
      },
    ];

    setInterval(function () {
      self.currentVisibleImageIndex =
        Math.floor(Math.random() * self.images.length);
    }, 3000);
  },
};
</script>

<style>
</style>
