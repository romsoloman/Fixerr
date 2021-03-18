<template>
  <div class="details-wrapper main-container">
    <div class="gig-details">

      <div class="gig-title">
        {{ this.gig.title }}
      </div>

      <div class="img-container"></div>
      <!-- <img class="gig-img" src="@/img/book2.png" alt="" /> -->
      <img class="gig-img" src="https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_1280.jpg" alt="" />
      <!-- <img class="gig-img" src="http://coding-academy.org/books-photos/1.jpg" alt="" /> -->

      <div class="gig-title">
        {{ gig.about }}
      </div>

      <div>rate : {{ gig.rating }}</div>
      <div>${{ gig.price }}</div>
      tags :{{ gig.tags[0] }}

      <div>
        creator name: {{ gig.creator.fullname }}
        {{ gig.creator.imgUrl }}
      </div>

      <div>
        reviews :
        {{ gig.reviews[0].txt }}
      </div>

      <div>rates : {{ gig.reviews[0].rate }}</div>
      <div>by : {{ this.gig.reviews[0].by.fullname}}</div>

      <div>
        <!-- <router-link  :to="'/gig/'+ gigId + '/checkout'">Checkout</router-link> -->
        <button class="continue-btn" @click.prevent="continueToCheckout()">
          Continue
        </button>

        <!-- <router-link class="gig-details-link" :to="'/gig/'+gig._id+'/details'"> -->
      </div>

      <div>
        {{ gig.by }}
      </div>

    
    </div>
  </div>
</template>

<script>
export default {
  name: "gig-details",
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
      review: {
        content: "note reviewed yet",
      },
    };
  },

  mounted() {
    console.log('in gig-details  : gig.reviews[0].by.fullname',this.gig.reviews[0].by.fullname)
    this.gigId = this.$route.params.gigId;
    this.gig = this.$store.getters.getGigById(this.gigId);

   //console.log("on load in gig-details, gigId : ", this.gigId);
  },
  methods: {
    continueToCheckout() {
      this.$router.push(`/gig/${this.gigId}/checkout`);

      // this.$router.push('/gig/ + this.gigId+/checkout')
    },
  },
};
</script>

<style>
</style>