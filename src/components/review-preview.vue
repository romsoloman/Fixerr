<template>
    <section class="review-container">
     <div class="by-user">
       <!-- <img class="user-image" :src="review.by.imgUrl" alt=""> -->
       <p>{{review.by.fullname}}</p>
       <p>{{review.rate}}</p>
     </div>
     <p>{{review.txt}}</p>
     <button @click="onRemoveReview"> X </button>
    </section>
</template>


<script>
export default {
  props: {
    review: Object,
    editNewReview:null,
  },
  methods:{
    onRemoveReview(){
      this.$emit('removeReview',this.review.id)
    }
  },
  computed: {},
};
</script>
