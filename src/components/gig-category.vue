<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    orders: Array,
  },
  data() {
    return {};
  },
  created() {},
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
