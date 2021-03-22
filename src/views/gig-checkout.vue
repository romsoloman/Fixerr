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
    <div class="flex gig-info">
      <div class="flex gig-details">
        <img class="gig-checkout-img" :src="gig.imgUrls[0]" alt="" />
        <div class="gig-about">
          <h4>{{ gig.title }}</h4>
          <span>⭐️⭐️⭐️{{ gig.rating }}</span>
        </div>
      </div>
      <div class="gig-pricing">
        <label>Qty</label>
        <select name="qty">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <span>${{ gig.price }}</span>
      </div>
    </div>
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
          Continue to Checkout
        </button>
        <span>You won't be charged yet</span>
      </div>
    </div>
    <div class="checkout-modal" v-if="isPurchase">congratulations !</div>
  </div>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import { orderService } from "../services/order.service.js";
import { utilService } from "../services/util.service.js";

export default {
  name: "gig-checkout",
  data() {
    return {
      isPurchase: false,
      gig: null,
      serviceFee: utilService.getRandomInt(3, 10),
      user:null,
      orderToEdit:null
    };
  },
  async created() {
    const gigId = this.$route.params.gigId;
    this.gig = await gigService.getById(gigId);
    this.user = this.$store.getters.loggedinUser;
    this.orderToEdit = orderService.getEmptyOrder();
  },
  computed: {
    totalPrice() {
      return this.gig.price + this.serviceFee;
    },
  },
  methods: {
   async checkout() {
        this.orderToEdit.buyer = this.user;
        this.orderToEdit.totalPrice = this.serviceFee + this.gig.price;
        this.orderToEdit.seller._id = this.gig.creator._id;
        this.orderToEdit.seller.name = this.gig.creator.fullname;
        this.orderToEdit.seller.imgUrl = this.gig.creator.imgUrl;
        this.orderToEdit.items[0]._id = this.gig._id;
        this.orderToEdit.items[0].title = this.gig.title;
        console.log('this.orderToEdit',this.orderToEdit );
        this.$store.dispatch({ type: "saveOrder", order: this.orderToEdit});
    }
  },
};
</script>

<style>
</style>
