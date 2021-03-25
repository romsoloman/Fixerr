
<template>
    <section class="msg-container" v-if="like">
      <header>
        <div class="user-made-like">
          <img :src="like.currUser.imgUrl" alt="">
          <p>{{like.currUser.fullname}}</p>
        </div>
        <p>NEW</p>
      </header>
      <div class="like-msg">{{like.currUser.fullname}} Liked {{like.creator.fullname}}'s gig</div>
    </section>
</template>
<script>
  export default {
    props:{
      like:Object
    },
    computed: {

    }
  }
</script>
