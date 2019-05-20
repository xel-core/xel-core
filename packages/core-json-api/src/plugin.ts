import { Container, Logger } from "@arkecosystem/core-interfaces";
import { defaults } from "./defaults";
import { Server } from "./server";

export const plugin: Container.IPluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "json-api",
    async register(container: Container.IContainer, options) {
        // @ts-ignore
        if (!options.http.enabled && !options.https.enabled) {
            container.resolvePlugin<Logger.ILogger>("logger").info("JSON-API API is disabled");

            return false;
        }

        const server = new Server(options);
        await server.start();

        return server;
    },
    async deregister(container: Container.IContainer, options) {
        if (options.enabled) {
            container.resolvePlugin<Logger.ILogger>("logger").info(`Stopping JSON-API API`);

            await container.resolvePlugin<Server>("api").stop();
        }
    },
};
