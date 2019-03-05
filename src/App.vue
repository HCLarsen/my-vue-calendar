<template>
  <router-view></router-view>
</template>

<script>
//<YearView />
//<MonthView v-bind:initialMonth="month" v-bind:initialYear="year" />
import YearView from "./components/YearView";
import MonthView from "./components/MonthView";
import DayView from "./components/DayView";

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
    MonthView,
    DayView
  }
};
</script>

<style></style>
