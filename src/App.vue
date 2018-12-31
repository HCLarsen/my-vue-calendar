<template>
  <router-view></router-view>
</template>

<script>
//<YearView />
//<MonthView v-bind:initialMonth="month" v-bind:initialYear="year" />
import YearView from "./components/YearView";
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
    YearView,
    MonthView
  }
};
</script>

<style></style>
