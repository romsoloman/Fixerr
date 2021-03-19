<template>
  <section class="hero-app">
    <div class="hero-backgrounds">
      <img src="../assets/imgs/bg-hero-1.png" alt="" />
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
            :to="{ name: 'gig', params: { filterBy: filterBy } }"
          >
            Search
          </router-link>
        </div>
        <div class="flex popular-search">
          <span>popular:</span>
          <!-- TODO: need to insert the category name into filterBy object -->
          <router-link :to="{ name: 'gig', params: { filterBy: filterBy } }">
            Business
          </router-link>
          <!-- TODO: need to insert the category name into filterBy object -->
          <router-link :to="{ name: 'gig', params: { filterBy: filterBy } }">
            Gaming
          </router-link>
          <!-- TODO: need to insert the category name into filterBy object -->
          <router-link :to="{ name: 'gig', params: { filterBy: filterBy } }">
            Programming and Tech
          </router-link>
          <!-- TODO: need to insert the category name into filterBy object -->
          <router-link :to="{ name: 'gig', params: { filterBy: filterBy } }">
            Data
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
    };
  },
  methods: {},
};
</script>

<style>
</style>
