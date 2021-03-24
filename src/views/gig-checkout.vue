<template>
  <div v-if="gig" class="container flex column details">
    <div class="requirements">
      <i class="fas fa-info-circle"></i>
      <span
        >Hey! {{ gig.creator.fullname }} is waiting for your requirements right
        after you complete the order</span
      >
      <a href="#">Ok,got It!</a>
    </div>
    <h3>Customize Your Package</h3>
    <gig-checkout-info :gig="gig"></gig-checkout-info>
    <gig-summary
      :gig="gig"
      :user="user"
      :orderToEdit="orderToEdit"
    ></gig-summary>
  </div>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import { orderService } from "../services/order.service.js";
import gigCheckoutInfo from "@/components/gig-checkout-info.vue";
import gigSummary from "@/components/gig-summary.vue";

export default {
  name: "gig-checkout",
  data() {
    return {
      isPurchase: false,
      gig: null,
      user: null,
      orderToEdit: null,
    };
  },
  async created() {
    const gigId = this.$route.params.gigId;
    this.gig = await gigService.getById(gigId);
    this.user = this.$store.getters.loggedinUser;
    this.orderToEdit = orderService.getEmptyOrder();
  },
  components: {
    gigCheckoutInfo,
    gigSummary,
  },
};
</script>

<style>
</style>
