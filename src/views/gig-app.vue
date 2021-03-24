<template>
  <loader v-if="isLoading" />
  <section v-else class="container gig-app-container">
    <gig-filter @setFilter="setFilter" />
    <gig-list :gigs="gigs" @cardLiked="cardLiked"/>
  </section>
</template>

<script>
import {socketService} from '../services/socket.service.js';
import { gigService } from "../services/gig.service.js";
import gigList from "@/components/gig-list";
import gigFilter from "@/components/gig-filter";
import loader from "@/components/loader";
export default {
  data() {
    return {
      gigToEdit: gigService.getEmptyGig(),
      topic:null,
    };
  },
  computed: {
    gigs() {
      return this.$store.getters.gigs;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    const { filterBy } = this.$route.params;
    this.$store.commit({ type: "setFilter", filterBy });
    this.$store.dispatch({ type: "loadGigs" });
  },
  methods: {
    cardLiked(gig){
      console.log('gig', gig);
    },

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
    loader,
    socketService
  },
};
</script>

<style>
</style>
