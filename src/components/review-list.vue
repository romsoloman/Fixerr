<template>
  <section class="review-app-container">
    <ul class="review-list-container">
      <li v-for="review in reviews" :key="review._id">
        <review-preview :review="review" @removeReview="removeReview"/>
      </li>
    </ul>
    <div class="add-new-review" v-if="editNewReview">
      <input type="text" v-model="editNewReview.txt">
      <input type="number" v-model="editNewReview.rat">
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
  data(){
    return{
      editNewReview:null
    }
  },
  methods:{
    onAddReview(){
      this.$emit('addReview',this.editNewReview)
    },
    removeReview(reviewId){
      this.$emit('removeReview',reviewId)
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
