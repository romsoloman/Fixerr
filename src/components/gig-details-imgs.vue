<template>
   <section class="gig-imgs-container">
          <div class="main-img-container">
            <img class="main-img" :src="mainImg" alt="" />
          </div>
          <div class="sub-img-container">
            <img
              class="sub-img"
              :src="gig.imgUrls[0]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[0] }"
              @click="changeMainImg(0)"
              alt=""
            />
            <img
              class="sub-img"
              :src="gig.imgUrls[1]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[1] }"
              @click="changeMainImg(1)"
              alt=""
            />
            <img
              class="sub-img"
              :src="gig.imgUrls[2]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[2] }"
              @click="changeMainImg(2)"
              alt=""
            />
            <img
              class="sub-img"
              :src="gig.imgUrls[3]"
              :class="{ 'curr-img': mainImg === gig.imgUrls[3] }"
              @click="changeMainImg(3)"
              alt=""
            />
          </div>
        </section>
</template>
<script>
export default {
  props: {
      gig: Object,
    },
  data() {
    return {
      mainImg: null,
    };
  },
  mounted() {
  },
  methods: {
    changeMainImg(imgIdx) {
      this.mainImg = this.gig.imgUrls[imgIdx];
      this.$emit("changeMainImg", this.mainImg);
    },
  },
  created() {
    this.mainImg = this.gig.imgUrls[0];
  },
  computed: {

  },
};
</script>

<style>
</style>
