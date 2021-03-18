<template>
  <section class="package-price-container">
    <header>
      <h3>package price</h3>
      <p>{{gig.price}} $ </p>
    </header>
    <p class="about">{{gig.about}}</p>
    <div class="delivery-time">Delivery time: {{gig.deliveryTime}}</div>
    <ul class="extras">
      <li class="extra" v-for="extra in gig.extras" :key="extra">
        {{extra}}
      </li>
    </ul>
    <button class="checkout-button" @click="onCheckout">checkout</button>
  </section>
</template>

<script>
export default {
  props: {
    gig: {
      type: Object,
    },
  },
    created() {
    console.log('gigId in packeg-price',this.gig._id );
    },
  methods:{
    onCheckout(){
      this.$router.push(`/gig/${this.gig._id}/checkout`);
    }
  },
  components: {
  },
};
</script>

<style>
</style>
