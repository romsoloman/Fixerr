<template>
  <section class="hero-app">
    <div class="hero-backgrounds">
      <div class="hero-andrea"></div>
    </div>
    <div class="hero-container">
      <h1 class="title">
        Find the perfect <i>freelance</i> services for your business
      </h1>
      <form class="search-box">
        <div class="search">
          <div class="search-icon">
            <i class="fas fa-search"></i>
          </div>
          <input
            type="text"
            placeholder="Try 'building mobile app'"
            v-model="filterBy.name"
          />
          <router-link :to="`/gig?category=${filterBy.name}`">
            Search
          </router-link>
        </div>
        <div class="popular-search">
          <span>popular:</span>
          <router-link :to="`/gig?category=business`">Business</router-link>
          <router-link :to="`/gig?category=gaming`">Gaming</router-link>
          <router-link :to="`/gig?category=programming+and+tech`">
            Programming and Tech
          </router-link>
          <router-link :to="`/gig?category=data`"> Data </router-link>
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
      },
    };
  },
  methods: {},
};
</script>

<style>
</style>
