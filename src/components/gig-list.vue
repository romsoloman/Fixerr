<template>
  <section
    class="gig-app-container"
    :class="{ 'profile-container': isProfile }"
  >
    <ul
      class="container gig-list-container"
      :class="{ 'profile-list': isProfile }"
    >
      <li
        class="flex justify-center gig-container"
        v-for="gig in gigs"
        :key="gig._id"
      >
        <gig-preview :gig="gig" :isProfile="isProfile" @cardLiked="cardLiked" />
      </li>
    </ul>
  </section>
</template>

<script>
import gigPreview from "@/components/gig-preview.vue";
export default {
  props: {
    gigs: {
      type: Array,
    },
    isProfile: {
      type: Boolean,
    },
  },
  methods: {
    cardLiked(gig) {
      this.$emit("cardLiked", gig);
    },
  },
  computed:{
  },
  components: {
    gigPreview,
  },
};
</script>

<style>
</style>
