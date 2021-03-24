<template>
  <section class="review-container container">
    <div class="user-image-container">
      <img class="user-image" :src="review.by.imgUrl" alt="" />
    </div>
    <div class="by-user">
      <div class="info">
        <h5>{{ review.by.fullname }}</h5>
        <p>★ {{ review.rate }}</p>
      </div>
      <div class="user-location">
        <div>{{ review.by.flag }}</div>
        <div class="from">{{ review.by.from }}</div>
      </div>
      <div>
        <p class="user-p">{{ review.txt }}</p>
      </div>
    </div>
    <!-- <button class="remove-review-button" @click="onRemoveReview"> X </button> -->
  </section>
</template>


<script>
export default {
  props: {
    review: Object,
    editNewReview: null,
  },
  methods: {
    onRemoveReview() {
      this.$emit("removeReview", this.review.id);
    },
  },
  computed: {},
};
</script>
