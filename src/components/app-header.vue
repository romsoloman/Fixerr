<template>
  <header class="app-header">
    <div class="logo">
      <!-- <img src="" alt=""> TODO: Replace the H1 in IMG-->
      <router-link to="/"><h1>Fixerr</h1></router-link>
    </div>
    <!-- <div v-if="!isHomepage" class="category-search">
      <div class="search-icon">
        <i class="fas fa-search"></i>
      </div>
      <input
        type="text"
        placeholder="Try 'building mobile app'"
        v-model="filterBy.name"
      />
      <router-link :to="`/gig?category=${filterBy.name}`"> Search </router-link>
    </div> -->
    <nav class="nav-links">
      <router-link to="/gig">Explore</router-link>
      <router-link to="/gig/edit">Become a Seller</router-link>
      <router-link to="/login">Sign in</router-link>
      <router-link to="/login">Join</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
      },
      // isHomepage: true,
    };
  },
  created() {},
  components: {},
};
</script>

<style>
</style>
