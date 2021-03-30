<template>
  <section class="review-app-container container">
    <ul class="review-list-container">
      <li v-for="review in reviews" :key="review._id">
        <review-preview :review="review" @removeReview="removeReview" />
      </li>
    </ul>
    <div class="flex column add-new-review" v-if="editNewReview">
      <div class="stars">
        <div class="block">
          <el-rate
            v-model.number="editNewReview.rate"
            @change="rateGig(editNewReview.rate)"
          ></el-rate>
        </div>
      </div>
      <textarea
        type="text"
        v-model="editNewReview.txt"
        placeholder="Add review..."
      />
      <button class="fiverr-button add-review-button" @click="onAddReview">
        Add review
      </button>
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
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  methods: {
    rateGig(rate) {
      this.editNewReview = { ...this.editNewReview, rate: rate };
    },
    onAddReview() {
      if (!this.$store.getters.loggedinUser) {
        this.$store.commit({
          type: "updateLastPath",
          path: this.$router.history.current.path,
        });
        return this.$router.push(`/login`);
      }
      this.$emit("addReview", this.editNewReview);
      this.editNewReview = reviewService.getEmptyReview();
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
