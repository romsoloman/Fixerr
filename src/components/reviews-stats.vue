<template>
 <section class="reviews-stats-container">
    <div class="stat-container">
      <span class="5star">5 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" :style="{width:getPercentageOfRat5 +'%'}"></div>
      </div>
        <p class="number-of-rat">{{getReviewByNumber5}}</p>
    </div>
      <div class="stat-container">
      <span class="5star">4 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" :style="{width:getPercentageOfRat4 +'%'}"></div>
      </div>
        <p class="number-of-rat">{{getReviewByNumber4}}</p>
    </div>
      <div class="stat-container">
      <span class="5star">3 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" :style="{width:getPercentageOfRat3 +'%'}"></div>
      </div>
        <p class="number-of-rat">{{getReviewByNumber3}}</p>
    </div>
      <div class="stat-container">
      <span class="5star">2 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" :style="{width:getPercentageOfRat2 +'%'}"></div>
      </div>
        <p class="number-of-rat">{{getReviewByNumber2}}</p>
    </div>
      <div class="stat-container">
      <span class="5star">1 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" :style="{width:getPercentageOfRat1 +'%'}"></div>
      </div>
        <p class="number-of-rat">{{getReviewByNumber1}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    gig: {
      type: Object,
    },
  },
  computed:{
      getPercentageOfRat5(){
        // TODO-getPercentageOfRat - width style
        let reviewCount = this.getPercentageOfRat(4.5,5.5);
          return reviewCount/this.gig.reviews.length*100;
      },
      getPercentageOfRat4(){
        // TODO-getPercentageOfRat - width style
        let reviewCount = this.getPercentageOfRat(3.5,4.5);
        return reviewCount/this.gig.reviews.length*100;
      },
      getPercentageOfRat3(){
        // TODO-getPercentageOfRat - width style
        let reviewCount = this.getPercentageOfRat(2.5,3.5);
        return reviewCount/this.gig.reviews.length*100;
      },
      getPercentageOfRat2(){
        // TODO-getPercentageOfRat - width style
        let reviewCount = this.getPercentageOfRat(1.5,2.5);
        return reviewCount/this.gig.reviews.length*100;
      },
      getPercentageOfRat1(){
        // TODO-getPercentageOfRat - width style
        let reviewCount = this.getPercentageOfRat(0.5,1.5);
        return reviewCount/this.gig.reviews.length*100;
      },
      getReviewByNumber5(){
        return this.getPercentageOfRat(4.5,5.5);
      },
      getReviewByNumber4(){
        return this.getPercentageOfRat(3.5,4.5);
      },
      getReviewByNumber3(){
        return this.getPercentageOfRat(2.5,3.5);
      },
      getReviewByNumber2(){
        return this.getPercentageOfRat(1.5,2.5);
      },
      getReviewByNumber1(){
        return this.getPercentageOfRat(0.5,1.5);
      }
    },
    methods:{
      getPercentageOfRat(number1,number2){
         let reviewCount = this.gig.reviews.reduce((acc, review) => {
        if(review.rate >= number1 && review.rate < number2)
        acc += 1
        return acc;
        }, 0);
        return reviewCount;
      },
    }
};
</script>

<style>
</style>
