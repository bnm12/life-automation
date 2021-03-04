export interface RouteDefinition {
    path: string;
    handler: (request, response) => any;
    method: "post" | "get" | "put" | "delete";
}