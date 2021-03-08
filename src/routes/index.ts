import express from 'express';

const router = express.Router();

import sleepRoute from "./sleep-as-android.route";
import carRoute from "./car-mode.route";
import pomoDone from "./pomodone.route";

const routes = [
    sleepRoute,
    carRoute,
    pomoDone
]


for (const route of routes) {
  const path = route.path + `/${process.env.RANDOM_STRING}`;
  console.log(`Registered route: [${route.method.toUpperCase()}] ${path}`)
  router[route.method](path, route.handler)
}


export default router;