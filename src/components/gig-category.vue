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
    topSellingGig() {
      return this.$store.getters.topSellingGig;
    },
    gigsTitle() {
      const gigsObj = this.topSellingGig;
      const gigsTitle = [];
      for (const title in gigsObj) {
        gigsTitle.push(title);
      }
      return gigsTitle;
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.gigsTitle,
        datasets: [
          {
            data: Object.values(this.topSellingGig),
            backgroundColor: [
              "rgb(245, 203, 124)",
              "rgb(163, 244, 156)",
              "rgb(169, 173, 227)",
              "rgb(250, 156, 181)",
            ],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
