import { RouteDefinition } from "./routeInterface";

export default {
    method: "post",
    handler: (request, response) => {
        console.log(request.body) // Call your action on the request here
        response.status(200).send(request.body).end() // Responding is important
    },
    path: "/sleep-as-android"
} as RouteDefinition