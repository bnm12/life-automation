import express from 'express';

const router = express.Router();

// Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

import sleepRoute from "./sleep-as-android.route";

const routes = [
    sleepRoute,
]


for (const route of routes) {
    const path = route.path + `/${process.env.RANDOM_STRING}`;
    console.log(`Registered route: [${route.method.toUpperCase()}] ${path}`)
    router[route.method](path , route.handler)
}


export default router;