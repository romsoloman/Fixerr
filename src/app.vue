<template>
  <div id="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import appHeader from "@/components/app-header";
import appFooter from "@/components/app-footer";

export default {
  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadGigs" });
  },
  components: {
    appHeader,
    appFooter,
  },
};
</script>
