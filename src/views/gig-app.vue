<template>
  <section class="container gig-app-container">
    <gig-filter @setFilter="setFilter" />
    <gig-list :gigs="gigs" />
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import gigList from "@/components/gig-list";
import gigFilter from "@/components/gig-filter";
export default {
  data() {
    return {
      gigToEdit: gigService.getEmptyGig(),
    };
  },
  computed: {
    gigs() {
      return this.$store.getters.gigs;
    },
  },
  created() {
    const { filterBy } = this.$route.params;
    this.$store.commit({ type: "setFilter", filterBy });
    this.$store.dispatch({ type: "loadGigs" });
  },
  methods: {
    removeGig(gigId) {
      this.$store.dispatch({ type: "remove", gigId });
    },
    addGig() {
      const gigToAdd = JSON.parse(JSON.stringify(this.gigToEdit));
      this.$store.dispatch({ type: "saveGigs", gig: gigToAdd }).then(() => {
        this.gigToEdit = gigService.getEmptyGig();
      });
    },
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "loadGigs" });
    },
  },
  components: {
    gigList,
    gigFilter,
  },
};
</script>

<style>
</style>
