<template>
  <div class="month">
    <nav id="month-nav">
      <h1>
        {{ monthName }}
        <router-link v-if="!miniMonth" :to="`/${year}`">{{ year }}</router-link>
      </h1>
    </nav>
    <div id="month-display">
      <ul id="days">
        <li
          v-for="n of daysOfPrevMonthShown()"
          :key="-n"
          class="day"
          v-bind:class="{ 'mini-day': miniMonth }"
        >
          <router-link
            v-if="!miniMonth"
            class="last-month"
            :to="prevMonthPath"
            >{{ n }}</router-link
          >
          <span v-else class="last-month">{{ n }}</span>
        </li>
        <li
          v-for="n in daysOfThisMonth()"
          :key="n"
          class="day"
          v-bind:class="{ 'mini-day': miniMonth }"
        >
          <router-link v-if="!miniMonth" class="this-month" :to="dayPath(n)">{{
            n
          }}</router-link>
          <span v-else class="this-month">{{ n }}</span>
        </li>
        <li
          v-for="n of daysOfNextMonthShown()"
          :key="n + daysInThisMonth"
          class="day"
          v-bind:class="{ 'mini-day': miniMonth }"
        >
          <router-link
            v-if="!miniMonth"
            class="next-month"
            :to="nextMonthPath"
            >{{ n }}</router-link
          >
          <span v-else class="next-month">{{ n }}</span>
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
    month: {
      type: Number,
      validator: function(value) {
        return value >= 0 && value <= 11;
      }
    },
    year: {
      type: Number
    },
    miniMonth: {
      type: Boolean
    }
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
    dayPath(day) {
      return `/${this.year}/${this.month + 1}/${day}`;
    }
  },
  computed: {
    monthName() {
      return new Date(0, this.month).toLocaleDateString("en-CA", {
        month: "long"
      });
    },
    daysInThisMonth() {
      return daysInMonth(this.month, this.year);
    },
    nextMonthPath() {
      return `/${this.nextMonth.year}/${this.nextMonth.month + 1}`;
    },
    prevMonthPath() {
      return `/${this.prevMonth.year}/${this.prevMonth.month + 1}`;
    },
    nextMonth() {
      let month = this.month + 1;
      let year = this.year;
      if (month > 11) {
        month -= 12;
        year += 1;
      }
      return { month: month, year: year };
    },
    prevMonth() {
      let month = this.month - 1;
      let year = this.year;
      if (month < 0) {
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

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
}
ul#days {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
  padding: 0%;
}
li.day {
  display: inline-block;
  width: 13%;
  width: calc(100% / 7 - 2px);
  padding-top: 13%;
  padding-top: calc(100% / 7 - 2px);
  height: 0;
  position: relative;

  border: 1px solid black;
  text-align: right;
  font-size: 6vw;
}
li.mini-day > span {
  font-size: 3vw;
}
a {
  text-decoration: none;
  color: black;
}
.this-month {
  color: black;
  background-color: white;
}
.last-month,
.next-month {
  color: grey;
  background-color: lightgray;
}
li.day > a,
li.day > span {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
