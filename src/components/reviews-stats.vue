<template>
 <section class="reviews-stats-container">
    <div class="stat-container">
      <span class="5star">5 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" style="width:40%"></div>
      </div>
        <p class="number-of-rat">4</p>
    </div>
      <div class="stat-container">
      <span class="5star">4 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" style="width:20%"></div>
      </div>
        <p class="number-of-rat">2</p>
    </div>
      <div class="stat-container">
      <span class="5star">3 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" style="width:10%"></div>
      </div>
        <p class="number-of-rat">1</p>
    </div>
      <div class="stat-container">
      <span class="5star">2 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" style="width:70%"></div>
      </div>
        <p class="number-of-rat">7</p>
    </div>
      <div class="stat-container">
      <span class="5star">1 star</span>
      <div class="stat-bar-container">
        <div class="fit-stat-background" style="width:0%"></div>
      </div>
        <p class="number-of-rat">0</p>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    getPercentageOfRat(){
      // TODO-getPercentageOfRat - width style
    },
  }
};
</script>

<style>
</style>
