<template>
  <section v-if="user" class="container user-details-container">
    <h2 class="title">welcome {{user.username}}</h2>
      <chart v-if="orderList" :orderList="orderList"/>
  </section>
</template>

<script>
import {userService} from '../services/user.service.js';
import chart from '@/components/chart.vue'
export default {
  data() {
    return {
      user:null,
      orderList: null,
    };
  },
  computed: {

  },
  created() {
    const userId = this.$route.params.userId;
    userService.getById(userId)
        .then(newUser=>{
          console.log('newUser', newUser);
          this.user = newUser;
          this.orderList = newUser.orders;
        })
  },
  computed:{
    gigsCountes(){
        const gigs = this.user.orders
        gigs.reduce((acc, gig) => {
        if (!acc[gig.price]) acc[gig.price] = 0;
        acc[gig.price]++;
        return acc;
        }, {});
    }
  },
  methods: {

  },
  components: {
    chart
  },
};
</script>

<style>
</style>
