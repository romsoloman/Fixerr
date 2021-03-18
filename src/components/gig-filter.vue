<template>
  <section class="filter-search">
    <div class="category-search">
      <div class="search-icon">
        <i class="fas fa-search"></i>
      </div>
      <input
        type="text"
        placeholder="Try 'building mobile app'"
        v-model="filterBy.name"
        @input="setFilter"
      />
      <button @click="setFilter">Search</button>
    </div>
    <div class="price-search">
      <h2>Min.</h2>
      <input
        type="number"
        placeholder="Any"
        min="0"
        max="5000"
        v-model.number="filterBy.price.minPrice"
      />
      <h2>Max.</h2>
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
      rating
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
      seller level
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
          minPrice: null,
          maxPrice: null,
        },
        rating: 0,
        level: 0,
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
</script>

<style>
</style>