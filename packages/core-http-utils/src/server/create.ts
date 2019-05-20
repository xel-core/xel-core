import Hapi from "@hapi/hapi";
import { readFileSync } from "fs";
import { monitorServer } from "./monitor";

export const createServer = async (options, callback?: any, plugins?: any[]) => {
    if (options.tls) {
        options.tls.key = readFileSync(options.tls.key);
        options.tls.cert = readFileSync(options.tls.cert);
    }

    const server = new Hapi.Server(options);

    if (Array.isArray(plugins)) {
        for (const plugin of plugins) {
            await server.register(plugin);
        }
    }

    await server.register({
        plugin: require("hapi-trailing-slash"),
        options: { method: "remove" },
    });

    if (callback) {
        await callback(server);
    }

    if (process.env.NODE_ENV === "test") {
        await monitorServer(server);
    }

    return server;
};
