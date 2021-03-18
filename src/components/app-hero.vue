<template>
  <section class="container hero-app">
    <div class="hero-backgrounds">
      <div class="hero-andrea"></div>
      <!-- <div
        class="hero-puka"
        :style="{ backgroundImage: `url(${item.img})` }"
      ></div>
      <div
        class="hero-simon"
        :style="{ backgroundImage: `url(${item.img})` }"
      ></div>
      <div
        class="hero-zack"
        :style="{ backgroundImage: `url(${item.img})` }"
      ></div>
      <div
        class="hero-dona"
        :style="{ backgroundImage: `url(${item.img})` }"
      ></div> -->
    </div>
    <div class="hero-container">
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
            placeholder="Try 'building mobile app'"
            v-model="filterBy.name"
          />
          <router-link
            class="flex justify-center align-center"
            :to="`/gig?name=${filterBy.name}`"
          >
            Search
          </router-link>
        </div>
        <div class="flex popular-search">
          <span>popular:</span>
          <router-link :to="`/gig?name=business`">Business</router-link>
          <router-link :to="`/gig?name=gaming`">Gaming</router-link>
          <router-link :to="`/gig?name=programming+and+tech`">
            Programming and Tech
          </router-link>
          <router-link :to="`/gig?name=data`"> Data </router-link>
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
    };
  },
  methods: {},
};
</script>

<style>
</style>
