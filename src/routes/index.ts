import express from 'express';
import pino from "express-pino-logger";

const router = express.Router();

// Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(pino);

import sleepRoute from "./sleep-as-android.route";
import carRoute from "./car-mode.route";

const routes = [
    sleepRoute,
    carRoute
]


for (const route of routes) {
  const path = route.path + `/${process.env.RANDOM_STRING}`;
  console.log(`Registered route: [${route.method.toUpperCase()}] ${path}`)
  router[route.method](path, route.handler)
}


export default router;