<template>
  <div class="month">
    <nav id="month-nav">
      <h1>{{ monthName }} {{ year }}</h1>
    </nav>
    <div id="month-display">
      <ul class="days">
        <li
          v-for="n of daysOfPrevMonthShown()"
          :key="-n"
          class="day last-month"
          @click="goToPrevMonth"
        >
          {{ n }}
        </li>
        <li v-for="n in daysOfThisMonth()" :key="n" class="day this-month">
          {{ n }}
        </li>
        <li
          v-for="n of daysOfNextMonthShown()"
          :key="n + daysInThisMonth"
          class="day next-month"
          @click="goToNextMonth"
        >
          {{ n }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { daysInMonth } from "@/utils/calendar_functions.js";

export default {
  name: "MonthView",
  props: {
    initialMonth: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0 && value <= 11;
      }
    },
    initialYear: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      month: this.initialMonth,
      year: this.initialYear
    };
  },
  methods: {
    daysOfPrevMonthShown() {
      let weekDay = new Date(this.year, this.month, 1).getDay();
      let start =
        daysInMonth(this.prevMonth.month, this.prevMonth.year) - weekDay + 1;
      return [...Array(weekDay).keys()].map(i => i + start);
    },
    daysOfThisMonth() {
      return [...Array(this.daysInThisMonth).keys()].map(i => i + 1);
    },
    daysOfNextMonthShown() {
      let lastDay = new Date(this.year, this.month, this.daysInThisMonth);
      let weekDay = lastDay.getDay();
      return [...Array(6 - weekDay).keys()].map(i => i + 1);
    },
    goToNextMonth() {
      this.month += 1;
    },
    goToPrevMonth() {
      this.month -= 1;
    }
  },
  computed: {
    monthName() {
      return new Date(0, this.month).toLocaleDateString("en-US", {
        month: "long"
      });
    },
    daysInThisMonth() {
      return daysInMonth(this.month, this.year);
    },
    prevMonth() {
      let month = this.month - 1;
      let year = this.year;
      if (month > 11) {
        month -= 12;
        year += 1;
      } else if (month < 0) {
        month += 12;
        year -= 1;
      }
      return { month: month, year: year };
    }
  },
  watch: {
    month() {
      if (this.month > 11) {
        this.month -= 12;
        this.year += 1;
      } else if (this.month < 0) {
        this.month += 12;
        this.year -= 1;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
}
ul.days {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
}
li.day {
  display: inline-block;
  width: 13%;
  height: 0;
  padding-top: 0%;
  padding-bottom: 13%;
  border: 1px solid black;
  text-align: right;
  font-size: 6vw;
}
li.this-month {
  color: black;
  background-color: white;
}

li.last-month,
li.next-month {
  color: grey;
  background-color: lightgray;
}
</style>
