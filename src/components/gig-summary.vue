<template>
  <section>
    <div class="flex column summary">
      <h4>Summary</h4>
      <div class="flex justify-between item item-1">
        <p>Subtotal</p>
        <p>${{ gig.price }}</p>
      </div>
      <div class="flex justify-between item item-2">
        <p>Service Fee</p>
        <p>$ {{ serviceFee }}</p>
      </div>
      <div class="flex justify-between item item-3">
        <p>Total</p>
        <p>$ {{ totalPrice }}</p>
      </div>
      <div class="flex justify-between item item4">
        <p>Delivery Time</p>
        <p>7 Days</p>
      </div>
      <div class="item-4">
        <button class="fiverr-button checkout-btn" @click.prevent="checkout()">
          Checkout
        </button>
        <span>You won't be charged yet</span>
      </div>
    </div>
    <div v-if="orderDone" class="checkout-modal-container">
      <div class="checkout-modal">
        Order Successfully Sent <i class="fas fa-bookmark"></i>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../services/util.service.js";
export default {
  data() {
    return {
      serviceFee: utilService.getRandomInt(3, 10),
      orderDone: false,
    };
  },
  props: {
    gig: {
      type: Object,
    },
    user: {
      type: Object,
    },
    orderToEdit: {
      type: Object,
    },
  },
  computed: {
    totalPrice() {
      return (this.gig.price + this.serviceFee).toFixed(2);
    },
  },
  methods: {
    async checkout() {
      try {
        if (!this.user) {
          this.$store.commit({
            type: "updateLastPath",
            path: this.$router.history.current.path,
          });
          return this.$router.push(`/login`);
        }
        this.orderToEdit.buyer = this.user;
        this.orderToEdit.totalPrice = this.serviceFee + this.gig.price;
        this.orderToEdit.seller._id = this.gig.creator._id;
        this.orderToEdit.seller.name = this.gig.creator.fullname;
        this.orderToEdit.seller.imgUrl = this.gig.creator.imgUrl;
        this.orderToEdit.items[0]._id = this.gig._id;
        this.orderToEdit.items[0].title = this.gig.title;
        console.log("this.orderToEdit", this.orderToEdit);
        this.$store.dispatch({ type: "saveOrder", order: this.orderToEdit });
        this.orderDone = true;
        setTimeout(() => {
          this.orderDone = false;
        }, 1500);
      } catch (err) {
        console.log("err to save order", err);
      }
    },
  },
};
</script>

<style>
</style>
