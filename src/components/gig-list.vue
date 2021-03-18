<template>
  <section class="gig-app-container">
    <ul class="gig-list-container">
      <li class="gig-container" v-for="gig in gigs" :key="gig._id">
        <gig-preview :gig="gig" />
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
  },
  components: {
    gigPreview,
  },
};
</script>

<style>
</style>
