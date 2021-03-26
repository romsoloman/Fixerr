<template>
  <loader v-if="isLoading" />
  <section v-else class="container gig-app">
    <like :currLike="currLike" :showLikeMsg="showLikeMsg" />
    <gig-filter @setFilter="setFilter" />
    <h1 v-if="currCategory" class="category-name">{{ currCategory }}</h1>
    <h4 v-if="currCategory" class="subtitle-category">
      Your story's unique. Tell it differently with
      <span>{{ currCategory }}</span> services.
    </h4>
    <gig-list :gigs="gigs" @cardLiked="cardLiked" />
    <h1 v-if="gigs.length === 0" class="not-found">Sorry, no gigs to show.</h1>
  </section>
</template>

<script>
import { socketService } from "../services/socket.service.js";
import { userService } from "../services/user.service.js";
import { gigService } from "../services/gig.service.js";
import like from "@/components/like";
import gigList from "@/components/gig-list";
import gigFilter from "@/components/gig-filter";
import loader from "@/components/loader";
export default {
  data() {
    return {
      gigToEdit: gigService.getEmptyGig(),
      currLike: null,
      loggedinUser: null,
      currCategory: null,
      showLikeMsg: false,
    };
  },
  computed: {
    gigs() {
      console.log("this.$store,getters.gigs", this.$store.getters.gigs);
      // this.$store,getters.gigs.forEach((currGig) => {
      //   console.log('currGig', currGig);
      //   console.log('currGig.currUserLikedThisGig', currGig.currUserLikedThisGig);
      // })
      return this.$store.getters.gigs;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    socketService.setup();
    socketService.on("like-addLike", this.addLike);
    const { filterBy } = this.$route.params;
    const filter = {
      name: "",
      price: { minPrice: 0, maxPrice: 5000 },
      rating: null,
      level: null,
      topic: null,
    };
    if (typeof filterBy === "string") {
      filter.name = filterBy;
      this.currCategory = filter.name;
      this.$store.commit({ type: "setFilter", filter });
    } else {
      this.$store.commit({ type: "setFilter", filterBy });
    }
    console.log("filterBy", filterBy);
    this.$store.dispatch({ type: "loadGigs" });
  },
  methods: {
    addLike(like) {
      this.currLike = like;
      this.showLikeMsg = true;
      setTimeout(() => {
        this.showLikeMsg = false;
      }, 2500);
    },
    cardLiked(gig) {
      // this.topic = gig.creator._id;
      const currUser = sessionStorage.getItem("loggedinUser");
      const likedGig = { ...gig };
      likedGig.currUser = currUser;
      this.$store.dispatch({ type: "addLike", like: likedGig });
      socketService.emit("like topic", this.topic);
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
    like,
  },
};
</script>

<style>
</style>
