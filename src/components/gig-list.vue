<template>
  <section class="gig-app-container">
    <ul class="container gig-list-container">
      <li class="gig-container" v-for="gig in gigs" :key="gig._id">
        <gig-preview :gig="gig" :isProfile="isProfile" />
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
  components: {
    gigPreview,
  },
};
</script>

<style>
</style>
