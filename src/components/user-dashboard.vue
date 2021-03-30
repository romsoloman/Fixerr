<template>
  <article class="user-dashboard">
    <div class="orders-kpi">
      <order-kpi :orders="orders"></order-kpi>
    </div>
    <div class="orders-table">
      <el-table :data="orders" :row-class-name="tableRowClassName">
        >
        <el-table-column prop="buyer.fullname" label="Name" width="280">
        </el-table-column>
        <el-table-column prop="createdAt" label="Date" width="300">
          <template slot-scope="props">
            {{
              moment(props.row.createdAt).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime" label="Delivery Time" width="160">
          <template slot-scope="props">
            {{ props.row.deliveryTime }} Days
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="180">
          <template slot-scope="props">
            <el-button
              @click="handleClick($event, props)"
              type="text"
              size="small"
            >
              Approve
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick($event, props)"
              >Cancel</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="Price">
          <template slot-scope="props"> ${{ props.row.totalPrice }} </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="gigs">
      <h1>My Gigs</h1>
      <gig-list :gigs="gigs" :isProfile="true"></gig-list>
    </div> -->
    <div class="price-by-day">
      <h1>Price Summary</h1>
      <price-summary :orders="orders" />
    </div>
    <div class="gig-category">
      <h1>Top Selling Gig</h1>
      <gig-category :orders="orders" />
    </div>
  </article>
</template>

<script>
import orderKpi from "@/components/order-kpi.vue";
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
  methods: {
    handleClick(ev, props) {
      const result = ev.target;
      if (result.innerText === "Approve") {
        this.$store.commit("changeStatus", {
          res: result.innerText,
          order: props.row,
        });
        this.$store.dispatch({ type: "saveOrder", order: props.row });
        result.parentElement.parentElement.innerText = "Approved";
      } else {
        this.$store.commit("changeStatus", {
          res: result.innerText,
          order: props.row,
        });
        this.$store.dispatch({ type: "saveOrder", order: props.row });
        result.parentElement.parentElement.innerText = "Cancelled";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status === "pending") {
        return "warning-row";
      } else if (row.status === "done") {
        return "success-row";
      } else return "cancel-row";
    },
  },
  components: {
    orderKpi,
    gigList,
    priceSummary,
    gigCategory,
  },
};
</script>

<style>
</style>
