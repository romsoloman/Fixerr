<template>
  <div class="flex gig-info">
    <div class="flex gig-details">
      <img class="gig-checkout-img" :src="gig.imgUrls[0]" alt="" />
      <div class="gig-about">
        <h4>{{ gig.title }}</h4>
        <el-rate
          v-model="gig.rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
      </div>
    </div>
    <div class="gig-pricing">
      <label>Qty</label>
      <select name="qty">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <span>${{ gig.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gig: {
      type: Object,
    },
  },
  computed: {},
};
</script>

<style>
</style>