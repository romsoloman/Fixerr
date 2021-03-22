<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    orderList: Array,
  },
  data() {
    return {
      priceCounter: {},
    };
  },
  created() {
    console.log('hiiiiii im here');
    this.priceCounter = this.orderList.reduce((priceCounter, order) => {
      if (!priceCounter[order.price]) priceCounter[order.price] = 0;
      if(order.inStock) priceCounter[order.price]++;

      console.log('priceCounter',priceCounter );
      return priceCounter;
    }, {});

  },
  computed: {
    labels() {
      return Object.keys(this.priceCounter)
    },
    typesStock(){
        return this.labels.map(label => +(this.priceCounter[label] / this.orderList.length *100).toFixed(2))
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#FF7F50","#f87979","#52fefe", "#373476", "#976",],
            data: ["40","30"],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
