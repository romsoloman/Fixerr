<template>
    <section class="review-container">
     <div class="by-user">
       <!-- <img class="user-image" :src="review.by.imgUrl" alt=""> -->
       <p>{{review.by.fullname}}</p>
       <p>{{review.rate}}</p>
     </div>
     <p>{{review.txt}}</p>
    </section>
</template>


<script>
export default {
  props: {
    review: Object,
    editNewReview:null,
  },
  computed: {},
};
</script>
