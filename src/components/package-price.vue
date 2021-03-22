<template>
  <section class="package-price-container container">
    <header class="price-container">
      <h3>package price</h3>
      <p class="price">$ {{gig.price}}</p>
    </header>
    <p class="package-about">{{gig.about}}</p>
    <div class="delivery-time"><i class="far fa-clock"></i> {{gig.deliveryTime}} Days delivery</div>
    <ul class="extras">
      <li class="extra" v-for="extra in gig.extras" :key="extra">
        <span><i class="fas fa-check"></i></span> {{extra}}
      </li>
    </ul>
    <button class="checkout-button fiverr-button" @click="onCheckout">checkout</button>
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
