import { IServer } from "../../../interfaces";
import * as handlers from "./handlers";

export const register = (server: IServer): void => {
    server.route({
        method: "GET",
        path: "/blockchain",
        handler: handlers.index,
    });
};
