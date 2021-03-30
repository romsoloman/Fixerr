<template>
  <div class="home">
    <app-hero></app-hero>
    <section class="container gig-categories">
      <article class="every-category trending">
        <h1>Top Selling Gigs</h1>
        <div class="category">
          <gig-list :gigs="trendingCategory"></gig-list>
        </div>
      </article>
      <article class="every-category top-rated-categories">
        <h1>Top rated categories</h1>
        <ul class="flex categories-links">
          <li v-for="(category, idx) in top5Cat" :key="idx">
            <!-- TODO: need to insert the category name into filterBy object -->
            <div class="category-card">
              <img :src="require(`../assets/imgs/${category.imgUrl}`)" />
              <router-link
                :to="{ name: 'gig', params: { filterBy: category.name } }"
              >
                {{ category.name }}
              </router-link>
            </div>
          </li>
        </ul>
      </article>
      <article class="every-category random-category">
        <h1>Gaming</h1>
        <div class="category">
          <gig-list :gigs="randomCategory"></gig-list>
        </div>
      </article>
      <article class="every-category explore-categories">
        <h1>Explore Marketplace</h1>
        <ul class="flex categories-list">
          <li v-for="(category, idx) in categories" :key="idx">
            <router-link
              :to="{ name: 'gig', params: { filterBy: category.name } }"
              class="flex align-center justify-center column"
            >
              <span class="green-line"></span>
              <img :src="require(`../assets/imgs/${category.imgUrl}`)" />
              {{ category.name }}
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
        {
          name: "Digital Marketing",
          imgUrl: "digital-cat.jpg",
        },
        {
          name: "Programming and Tech",
          imgUrl: "programming-cat.jpeg",
        },
        {
          name: "Graphics and Design",
          imgUrl: "design-cat.jpeg",
        },
        {
          name: "Video and Animation",
          imgUrl: "video-cat.jpg",
        },
      ],
      categories: [
        {
          name: "Programming and Tech",
          imgUrl: "programming.svg",
        },
        {
          name: "Graphics and Design",
          imgUrl: "graphics-design.svg",
        },
        {
          name: "Digital Marketing",
          imgUrl: "programming.svg",
        },
        {
          name: "Video and Animation",
          imgUrl: "video-animation.svg",
        },
        {
          name: "Data",
          imgUrl: "writing.svg",
        },
        {
          name: "Gaming",
          imgUrl: "video-animation.svg",
        },
        {
          name: "Writing and Translation",
          imgUrl: "writing.svg",
        },
        {
          name: "Music and Audio",
          imgUrl: "music-audio.svg",
        },
        {
          name: "Business",
          imgUrl: "business.svg",
        },
        {
          name: "Lifestyle",
          imgUrl: "lifestyle.svg",
        },
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
        return gig.rating > 4.4;
      });
      console.log("trendingCategory", trendingCategory);
      return trendingCategory.slice(0, 7);
    },
  },
  components: { appHero, gigList },
};
</script>
