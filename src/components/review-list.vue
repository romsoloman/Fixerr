<template>
  <section class="review-app-container container">
    <ul class="review-list-container">
      <li v-for="review in reviews" :key="review._id">
        <review-preview :review="review" @removeReview="removeReview" />
      </li>
    </ul>
    <div class="flex column add-new-review" v-if="editNewReview">
      <div class="stars">
        <span class="star1 gold-star" :class="{'draw-star':editNewReview.rate>0}" @click="rateGig(1)">★</span>
        <span class="star2 gold-star" :class="{'draw-star':editNewReview.rate>1}" @click="rateGig(2)">★</span>
        <span class="star3 gold-star" :class="{'draw-star':editNewReview.rate>2}" @click="rateGig(3)">★</span>
        <span class="star4 gold-star" :class="{'draw-star':editNewReview.rate>3}" @click="rateGig(4)">★</span>
        <span class="star5 gold-star" :class="{'draw-star':editNewReview.rate>4}" @click="rateGig(5)">★</span>
        <span class="star6 black-star" :class="{'remove-star':editNewReview.rate>0}" @click="rateGig(1)">✩</span>
        <span class="star7 black-star" :class="{'remove-star':editNewReview.rate>1}" @click="rateGig(2)">✩</span>
        <span class="star8 black-star" :class="{'remove-star':editNewReview.rate>2}" @click="rateGig(3)">✩</span>
        <span class="star9 black-star" :class="{'remove-star':editNewReview.rate>3}" @click="rateGig(4)">✩</span>
        <span class="star10 black-star" :class="{'remove-star':editNewReview.rate>4}" @click="rateGig(5)">✩</span>
      </div>
      <textarea type="text" v-model="editNewReview.txt" placeholder="Add review..."/>
      <button class="add-review-button" @click="onAddReview">Add review</button>
    </div>
  </section>
</template>

<script>
import { reviewService } from "../services/review.service.js";
import reviewPreview from "@/components/review-preview.vue";
export default {
  props: {
    reviews: {
      type: Array,
    },
  },
  data() {
    return {
      editNewReview: null,
    };
  },
  methods: {
    rateGig(rate){
      this.editNewReview.rate = rate;
      console.log('this.editNewReview', this.editNewReview);
    },
    onAddReview() {
      this.$emit("addReview", this.editNewReview);
    },
    removeReview(reviewId) {
      this.$emit("removeReview", reviewId);
    },
  },
  created() {
    this.editNewReview = reviewService.getEmptyReview();
  },
  components: {
    reviewPreview,
  },
};
</script>

<style>
</style>
