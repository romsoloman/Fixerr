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


<div class="checkout-modal" v-if="isPurchase">congradulations !

</div>
                 <!-- <p class="checkout-modal" v-if="isPurchase">congradulations !</p> -->

      </div>
    </div>
  </div>
</template>

<script>
import {utilService} from '../services/util.service.js'

export default {
  name: "gig-checkout",
  data() {
    return {
      isPurchase: false, 
      gigId: null,
            gig: {
          by : 'tempName',
          title : 'tempTitle',
          rating : '123',
          creator : {
            fullname :'tempName'
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
                 fullname : 'tempName'
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
        var purchaseGigId =this.gigId

       var order =  {
        "_id": utilService.makeId(),
        "createdAt": 9898989,
        "buyer": "mini-user",
        "totalPrice": 20,
        "vendor": {
            "_id": "v102",
            "name": "Hapirat Hadebil",
            "imgUrl": ""
        },
        "gigs": [
            {
                "_id": this.gigId,
                "name": "Batata Ksbia"
            },
         
        ],
        "status": "pending"
    }
        this.$store.dispatch({ type: 'checkout',order })
                .catch(err => {
                   console.log('ERROR IN CHECKOUT')
                })

                this.isPurchase=true;

    }

    },
};
</script>

<style>
</style>