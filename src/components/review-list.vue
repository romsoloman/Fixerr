<template>
  <section class="review-app-container">
    <ul class="review-list-container">
      <li v-for="review in reviews" :key="review._id">
        <review-preview :review="review" :addReview="addReview"/>
      </li>
    </ul>
    <div class="add-new-review" v-if="editNewReview">
      <input type="text" v-model="editNewReview.txt">
      <input type="number" v-model="editNewReview.rate">
     </div>
    <button class="add-review-button" @click="onAddReview">Add review</button>
  </section>
</template>

<script>
import {reviewService} from '../services/review.service.js'
import reviewPreview from "@/components/review-preview.vue";
export default {
  props: {
    reviews: {
      type: Array,
    },
  },
  methods:{
    addReview(newReview){
      //TODO ADD REVIEW
      console.log('newReview', newReview);
    },
    onAddReview(){
      this.$emit('addReview',this.editNewReview)
    }
  },
   created(){
    this.editNewReview = reviewService.getEmptyReview()
  },
  components: {
    reviewPreview,
  },
};
</script>

<style>
</style>
