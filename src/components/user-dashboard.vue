<template>
  <article class="user-dashboard">
    <div class="orders">
      <h1>My Orders</h1>
      <!-- <order-list :orders="orders"></order-list> -->
      <el-table :data="orders">
        <el-table-column prop="buyer.fullname" label="Name" width="280">
        </el-table-column>
        <el-table-column prop="createdAt" label="Date" width="330">
        </el-table-column>
        <el-table-column prop="deliveryTime" label="Delivery Time" width="330">
        </el-table-column>
        <el-table-column prop="totalPrice" label="Price"> </el-table-column>
      </el-table>
    </div>
    <div class="gigs">
      <h1>My Gigs</h1>
      <gig-list :gigs="gigs" :isProfile="true"></gig-list>
    </div>
    <div class="price-by-day">
      <h1>Price Summary</h1>
      <chart />
    </div>
    <div class="gig-category">
      <h1>Gig Category</h1>
      <chart />
    </div>
  </article>
</template>

<script>
import orderList from "@/components/order-list.vue";
import gigList from "@/components/gig-list.vue";
import chart from "@/components/chart.vue";
export default {
  props: {
    user: {
      type: Object,
    },
    orders: {
      type: Array,
    },
    gigs: {
      type: Array,
    },
  },
  computed: {},
  components: {
    orderList,
    gigList,
    chart,
  },
};
</script>

<style>
</style>
