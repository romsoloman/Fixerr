<template>
  <section class="flex align-center filter-search">
    <div class="flex align-center category-search">
      <div class="search-icon">
        <i class="fas fa-search"></i>
      </div>
      <input
        type="text"
        v-model="filterBy.name"
        class="search-input"
        placeholder="Find Services"
      />
      <button @click="setFilter" class="search-button">Search</button>
    </div>
    <div class="flex filter-actions">
      <div class="flex align-center justify-center border-filter price-search">
        <h5 class="budget">Budget</h5>
        <button class="arrow-btn" @click="isBudgClicked = !isBudgClicked">
          <span><i class="fas fa-arrow-down"></i></span>
        </button>
        <div v-if="isBudgClicked" class="flex column floating-menu">
          <div class="flex min-max">
            <div class="min-price">
              <h5>Min.</h5>
              <input
                type="number"
                placeholder="Any"
                min="0"
                max="5000"
                v-model.number="filterBy.price.minPrice"
              />
            </div>
            <div class="max-price">
              <h5>Max.</h5>
              <input
                type="number"
                placeholder="Any"
                min="0"
                max="5000"
                v-model.number="filterBy.price.maxPrice"
              />
            </div>
          </div>
          <div class="flex button-apply">
            <button @click="setFilter">Apply</button>
          </div>
        </div>
      </div>
      <div class="flex align-center justify-center border-filter rating-search">
        <h5>Rating</h5>
        <button class="arrow-btn" @click="isRateClicked = !isRateClicked">
          <span><i class="fas fa-arrow-down"></i></span>
        </button>
        <div v-if="isRateClicked" class="floating-menu">
          <div class="flex align-center column rating-value">
            <span>Rating : {{ filterBy.rating }}</span>
            <div class="block">
              <el-rate v-model="filterBy.rating"></el-rate>
            </div>
          </div>
          <div class="flex button-apply">
            <button @click="setFilter">Apply</button>
          </div>
        </div>
      </div>

      <div class="flex align-center justify-center border-filter level">
        <h5>Seller level</h5>
        <button class="arrow-btn" @click="isLevelClicked = !isLevelClicked">
          <span><i class="fas fa-arrow-down"></i></span>
        </button>
        <div v-if="isLevelClicked" class="floating-menu">
          <div class="flex align-center justify-center level-value">
            <el-input-number
              v-model="filterBy.level"
              :min="1"
              :max="5"
            ></el-input-number>
          </div>
          <div class="flex button-apply">
            <button @click="setFilter">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isRateClicked: false,
      isBudgClicked: false,
      isLevelClicked: false,
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
