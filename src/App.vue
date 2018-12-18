<template>
  <div id="app">
    <MonthView v-bind:initialMonth="month" v-bind:initialYear="year" />
  </div>
</template>

<script>
import MonthView from "./components/MonthView";

export default {
  name: "App",
  data() {
    return {
      month: 11,
      year: 2018
    };
  },
  components: {
    MonthView
  }
};
</script>

<style></style>
