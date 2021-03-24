<template>
  <section class="flex align-center filter-search">
    <div class="flex align-center category-search">
      <div class="search-icon">
        <i class="fas fa-search"></i>
      </div>
      <input type="text" v-model="filterBy.name" class="search-input" />
      <button @click="setFilter" class="search-button">Search</button>
    </div>
    <div class="flex align-center price-search">
      <h5>Min.</h5>
      <input
        type="number"
        placeholder="Any"
        min="0"
        max="5000"
        v-model.number="filterBy.price.minPrice"
      />
      <h5>Max.</h5>
      <input
        type="number"
        placeholder="Any"
        min="0"
        max="5000"
        v-model.number="filterBy.price.maxPrice"
      />
      <button @click="setFilter">Apply</button>
    </div>
    <div class="rating-search">
      Rating
      <select name="ratings" v-model.number="filterBy.rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button @click="setFilter">Apply</button>
    </div>
    <div class="seller-level">
      Seller level
      <select name="levels" v-model.number="filterBy.level">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button @click="setFilter">Apply</button>
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
        rating: null,
        level: null,
      },
    };
  },
  methods: {
    setFilter() {
      console.log("this.filterBy", this.filterBy);
      this.$emit("setFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
</script>

<style>
</style>
