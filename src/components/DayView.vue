<template>
  <nav>
    <h1>
      {{ dayOfWeek }},
      <router-link :to="monthPath">{{ monthName(month) }}</router-link>
      {{ day }},
      <router-link :to="yearPath">{{ year }}</router-link>
    </h1>
  </nav>
</template>

<script>
import { daysInMonth } from "@/utils/calendar_functions.js";

export default {
  name: "DayView",
  props: {
    day: {
      type: Number,
      validator: function(value) {
        return value > 0;
      }
    },
    month: {
      type: Number,
      validator: function(value) {
        return value >= 0 && value <= 11;
      }
    },
    year: {
      type: Number
    }
  },
  methods: {
    monthName(month) {
      return new Date(0, month).toLocaleDateString("en-CA", {
        month: "long"
      });
    }
  },
  computed: {
    dayOfWeek() {
      return new Date(this.year, this.month, this.day).toLocaleDateString(
        "en-CA",
        { weekday: "long" }
      );
    },
    monthPath() {
      return `/${this.year}/${this.month + 1}`;
    },
    yearPath() {
      return `/${this.year}`;
    }
  }
};
</script>

<style scoped>
h1 > a {
  text-decoration: none;
  color: black;
}
</style>
