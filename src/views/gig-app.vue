<template>
  <loader v-if="isLoading" />
  <section v-else class="container gig-app-container">
    <h1 v-if="currLike">
      {{ currLike.currUser.fullname }} Liked gig of
      {{ currLike.creator.fullname }}
    </h1>
    <gig-filter @setFilter="setFilter" />
    <gig-list :gigs="gigs" @cardLiked="cardLiked" />
  </section>
</template>

<script>
import { socketService } from "../services/socket.service.js";
import { userService } from "../services/user.service.js";
import { gigService } from "../services/gig.service.js";
import gigList from "@/components/gig-list";
import gigFilter from "@/components/gig-filter";
import loader from "@/components/loader";
export default {
  data() {
    return {
      gigToEdit: gigService.getEmptyGig(),
      currLike: null,
      loggedinUser: null,
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
    this.loggedinUser = userService.getLoggedinUser();
    console.log("this.loggedinUser", this.loggedinUser);
    socketService.setup();
    socketService.on("like-addLike", this.addLike);
    const { filterBy } = this.$route.params;
    const filter = {
      name: "",
      price: { minPrice: 0, maxPrice: 5000 },
      rating: null,
      level: null,
    };
    if (typeof filterBy === "string") {
      filter.name = filterBy;
      this.$store.commit({ type: "setFilter", filter });
    } else this.$store.commit({ type: "setFilter", filterBy });
    console.log("filterBy", filterBy);
    this.$store.dispatch({ type: "loadGigs" });
  },
  methods: {
    addLike(like) {
      console.log("like", like);
      this.currLike = like;
    },
    cardLiked(gig) {
      const currUser = sessionStorage.getItem("loggedinUser");
      const likedGig = { ...gig };
      likedGig.currUser = currUser;
      socketService.emit("like", likedGig);
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
    socketService,
  },
};
</script>

<style>
</style>
