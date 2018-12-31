// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App";
import YearView from "./components/YearView";
import MonthView from "./components/MonthView";

Vue.config.productionTip = false;

Vue.use(VueRouter);

function yearProps(route) {
  return {
    year: parseInt(route.params.year)
  };
}

function monthProps(route) {
  return {
    year: parseInt(route.params.year),
    month: parseInt(route.params.month - 1)
  };
}

function dayProps(route) {
  return {
    year: parseInt(route.params.year),
    month: parseInt(route.params.month - 1),
    day: parseInt(route.params.day)
  };
}

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: MonthView,
      props: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      }
    },
    { path: "/:year", component: YearView, props: yearProps },
    {
      path: "/:year/:month",
      component: MonthView,
      props: monthProps
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
