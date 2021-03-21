<template>
  <section class="hero-app">
    <div class="hero-backgrounds">
      <img :src="require(`../assets/imgs/${mainImageSrc}`)" />
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
            class="search-input"
          />
          <router-link
            class="flex justify-center align-center search-button"
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
      self.mainImageSrc =
        self.images[Math.floor(Math.random() * self.images.length)].image;
    }, 3000);
  },
};
</script>

<style>
</style>
