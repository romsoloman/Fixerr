<template>
  <div class="details-wrapper main-container">
    <div class="chackout-container main-container">
      <div class="content-container">
        <div class="content">
          <img class="gig-checkout-img" src="http://coding-academy.org/books-photos/1.jpg" alt="" />

          <div>rate : {{ gig.rating }}</div>

          tags :{{ gig.tags[0] }}

          <div>creator name: {{ gig.creator.fullname }}</div>

          <div>
            reviews :
            {{ gig.reviews[0].txt }}
          </div>
        </div>

        <div>${{ gig.price }}</div>
<!-- 
        <div>by : {{ gig.reviews[0].by.fullname }}</div> -->

        <div>
          <!-- <router-link  :to="'/gig/'+ gigId + '/checkout'">Checkout</router-link> -->

          <button class="checkout-btn"  @click.prevent="checkout()">Checkout</button>

          <!-- <router-link class="gig-details-link" :to="'/gig/'+gig._id+'/details'"> -->
        </div>

        <div>
          {{ gig.by }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gig-checkout",
  data() {
    return {
      gigId: null,
            gig: {
          by : 'cbcb',
          title : 'abc',
          rating : '12',
          creator : {
            fullname :'omer'
          },
          about : 'abc',
          rating : '123',
          price : '123',
          tags : ['123'],
          reviews :  [
            {
              txt : 'abc',
              rate : '123',
             by : {
                 fullname : 'omer'
                 }
             }
          ] ,
                 
      },
    };
  },
  mounted() {
    this.gigId = this.$route.params.gigId;
    //console.log("on load in gig-checkout gigId : ", this.gigId);
    //this.gig = this.$store.getters.getGigById(this.gigId)
    this.gig = this.$store.getters.getGigById(this.gigId);
  },
    methods: {
       checkout(){

    }

    },
};
</script>

<style>
</style>