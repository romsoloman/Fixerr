<template>
    <div class="more-on-seller">
          <div class="detail seller-from">
            <p>From</p>
            <h3>{{ gig.creator.location }}</h3>
          </div>
          <div class="detail member-since">
            <p>Member since</p>
            <h3>{{ getTimeOfMemberSince }}</h3>
          </div>
          <div class="detail avg-response-time">
            <p>Avg response time</p>
            <h3>{{ gig.creator.avgResponseTime }}</h3>
          </div>
          <div class="detail last-delivery">
            <p>Last delivery</p>
            <h3>{{ gig.creator.lastDelivery }}</h3>
          </div>
        </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
      gig: Object,
    },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {

  },
  created() {

  },
  computed: {
    getTimeOfMemberSince() {
      if (this.gig.creator.memberSince) {
        let currTime;
        currTime = moment(this.gig.creator.memberSince).fromNow(); // 3 days ago
        return currTime;
      }
    },
  },
};
</script>

<style>
</style>
