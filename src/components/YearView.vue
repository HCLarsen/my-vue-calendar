<template>
  <div class="year">
    <h1>{{ year }}</h1>
    <ul id="months">
      <li v-for="n in 12" class="mini-month" :key="n">
        <router-link :to="monthPath(n)">
          <MonthView
            v-bind:month="n - 1"
            v-bind:year="year"
            v-bind:mini-month="true"
          />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import MonthView from "./MonthView";

export default {
  name: "YearView",
  props: {
    year: {
      type: Number,
      default: 2018
    }
  },
  methods: {
    monthName(month) {
      return new Date(0, month).toLocaleDateString("en-CA", {
        month: "long"
      });
    },
    monthPath(month) {
      return `/${this.year}/${month}`;
    }
  },
  components: {
    MonthView
  }
};
</script>

<style scoped>
ul#months {
  list-style-type: none;
  padding: 0;
}
li.mini-month {
  display: inline-block;
  width: calc(100% / 3);
}
li.mini-month > a {
  text-decoration: none;
  color: black;
}
</style>
