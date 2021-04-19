<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    orders: Array,
  },
  data() {
    return {
      priceCounter: {},
    };
  },
  created() {
    // this.priceCounter = this.orderList.reduce((priceCounter, order) => {
    //   if (!priceCounter[order.price]) priceCounter[order.price] = 0;
    //   if(order.inStock) priceCounter[order.price]++;
    //   return priceCounter;
    // }, {});
  },
  computed: {
    labels() {
      const orders = this.orders || [];
      const usernames = orders.map((order) => {
        return order.buyer.fullname;
      });
      return usernames;
    },
    prices() {
      const orders = this.orders || [];
      const userPrices = orders.map((order) => {
        return order.totalPrice;
      });
      return userPrices;
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: ["#1DBF73"],
            borderColor: ["#404145"],
            label: "Price Per User",
            data: this.prices,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
