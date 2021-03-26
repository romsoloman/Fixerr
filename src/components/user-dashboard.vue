<template>
  <article class="user-dashboard">
    <div class="orders">
      <h1>My Orders</h1>
      <!-- <order-list :orders="orders"></order-list> -->
      <el-table :data="orders">
        <el-table-column prop="buyer.fullname" label="Name" width="280">
        </el-table-column>
        <el-table-column prop="createdAt" label="Date" width="330">
          <template slot-scope="props">
            {{
              moment(props.row.createdAt).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime" label="Delivery Time" width="300">
          <template slot-scope="props">
            {{ props.row.deliveryTime }} Days
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="Price">
          <template slot-scope="props"> ${{ props.row.totalPrice }} </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="gigs">
      <h1>My Gigs</h1>
      <gig-list :gigs="gigs" :isProfile="true"></gig-list>
    </div>
    <div class="price-by-day">
      <h1>Price Summary</h1>
      <price-summary :orders="orders" />
    </div>
    <div class="gig-category">
      <h1>Gig Category</h1>
      <gig-category :orders="orders" />
    </div>
  </article>
</template>

<script>
import orderList from "@/components/order-list.vue";
import gigList from "@/components/gig-list.vue";
import gigCategory from "@/components/gig-category.vue";
import priceSummary from "@/components/price-summary.vue";
import moment from "moment";
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
  data() {
    return {
      moment: moment,
    };
  },
  computed: {},
  components: {
    orderList,
    gigList,
    priceSummary,
    gigCategory,
  },
};
</script>

<style>
</style>
