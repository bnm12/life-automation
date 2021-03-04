import { Request, Response } from "express";
export interface RouteDefinition {
    path: string;
    handler: (request: Request, response: Response) => any;
    method: "post" | "get" | "put" | "delete";
}