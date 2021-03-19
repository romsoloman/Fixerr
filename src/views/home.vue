<template>
  <div class="home">
    <app-hero></app-hero>
    <section class="gig-categories">
      <article class="trending">
        <h1>Trending Category:</h1>
        <gig-list :gigs="trendingCategory"></gig-list>
      </article>
      <article class="top-rated-categories">
        <h1>Top rated categories:</h1>
        <ul class="categories-links"></ul>
        <li v-for="(category, idx) in top5Cat" :key="idx">
          <!-- TODO: need to insert the category name into filterBy object -->
          <router-link :to="{ name: 'gig', params: { filterBy: filterBy } }">
            {{ category }}
          </router-link>
        </li>
      </article>
      <article class="random-category">
        <h1>Gaming:</h1>
        <gig-list :gigs="randomCategory"></gig-list>
      </article>
      <article class="explore-categories">
        <h1>Explore Marketplace:</h1>
        <ul class="categories-list">
          <li v-for="(category, idx) in categories" :key="idx">
            <!-- TODO: need to insert the category name into filterBy object -->
            <router-link :to="{ name: 'gig', params: { filterBy: filterBy } }">
              {{ category }}
            </router-link>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script>
import appHero from "@/components/app-hero";
import gigList from "@/components/gig-list.vue";
export default {
  name: "Home",
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
      top5Cat: [
        "Digital Marketing",
        "Programming and Tech",
        "Graphics and Design",
        "Video and Animation",
        "Lifestyle",
      ],
      categories: [
        "Digital Marketing",
        "Programming and Tech",
        "Graphics and Design",
        "Video and Animation",
        "Lifestyle",
        "Gaming",
        "Business",
        "Data",
        "Writing and Translation",
        "Music and Audio",
      ],
    };
  },
  computed: {
    gigs() {
      return this.$store.getters.gigs;
    },
    randomCategory() {
      const gigs = this.$store.getters.gigs || [];
      const randomCategory = gigs.filter((gig) => {
        return gig.tags.includes("gaming");
      });
      return randomCategory;
    },
    trendingCategory() {
      const gigs = this.$store.getters.gigs || [];
      const trendingCategory = gigs.filter((gig) => {
        return gig.tags.includes("programming and tech");
      });
      return trendingCategory;
    },
  },
  methods: {},
  components: { appHero, gigList },
};
</script>
