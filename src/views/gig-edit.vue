<template>
  <section class="gig-edit-container container">
    <div class="edit-title">
      <h4>Add title</h4>
      <textarea
        class="edit-inputs"
        name="title"
        id=""
        cols="30"
        rows="1"
        placeholder="Add title..."
        v-model="gigToEdit.title"
      ></textarea>
    </div>
    <div class="edit-aboat">
      <h4>Add about</h4>
      <textarea
        class="edit-inputs"
        name="about"
        id=""
        cols="30"
        rows="5"
        placeholder="Enter gig about..."
        v-model="gigToEdit.about"
      ></textarea>
    </div>
    <div class="edit-tags">
      <h4>Add Tags</h4>
      <select-tags
        @updateGigEditFromSelect="updateGigEditFromSelect"
      ></select-tags>
    </div>
    <div class="edit-imgs">
      <h4>Add imgs</h4>
      <input
        placeholder="Add img url..."
        class="edit-inputs"
        type="text"
        v-model="gigToEdit.imgUrls[0]"
      />
      <input
        placeholder="Add img url..."
        class="edit-inputs"
        type="text"
        v-model="gigToEdit.imgUrls[1]"
      />
      <input
        placeholder="Add img url..."
        class="edit-inputs"
        type="text"
        v-model="gigToEdit.imgUrls[2]"
      />
      <input
        placeholder="Add img url..."
        class="edit-inputs"
        type="text"
        v-model="gigToEdit.imgUrls[3]"
      />
    </div>
    <div class="edit-price">
      <h4>Add price</h4>
      <input
        class="edit-inputs"
        type="number"
        v-model.number="gigToEdit.price"
        placeholder="Add price..."
      />
    </div>
    <div class="edit-delivery-time">
      <input
        class="edit-inputs"
        type="number"
        v-model="gigToEdit.deliveryTime"
        placeholder="Add delivery time..."
      />
    </div>
    <button class="edit-save fiverr-button" @click="saveGig">SAVE</button>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import selectTags from "@/components/select-tags";
export default {
  data() {
    return {
      gigToEdit: gigService.getEmptyGig(),
    };
  },
  methods: {
    updateGigEditFromSelect(value) {
      this.gigToEdit.tags = value;
      console.log("this.gigToEdit", this.gigToEdit);
    },
    saveGig() {
      if (!this.$store.getters.loggedinUser) {
        this.$store.commit({
          type: "updateLastPath",
          path: this.$router.history.current.path,
        });
        this.$store.commit({
          type: "keepEditChanges",
          newEditChanges: this.gigToEdit,
        });
        return this.$router.push("/login");
      } else {
        const user = this.$store.getters.loggedinUser;
        this.gigToEdit.creator = user;
        this.$store.commit({
          type: "addGig",
          gig: this.gigToEdit,
        });
      }
      const gigToSave = JSON.parse(JSON.stringify(this.gigToEdit));
      this.$store.dispatch({ type: "saveGigs", gig: gigToSave });
      return this.$router.push("/gig");
    },
  },
  components: {
    selectTags,
  },
  created() {
    if (this.$store.getters.getLastPath === "/login") {
      this.gigToEdit = this.$store.getters.getEditChanges;
    }
  },
};
</script>

<style>
</style>
