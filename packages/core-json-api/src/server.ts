import { app } from "@arkecosystem/core-container";
import { createServer, mountServer } from "@arkecosystem/core-http-utils";
import { Logger } from "@arkecosystem/core-interfaces";
import Hapi from "@hapi/hapi";
import { plugin as blacklist } from "@hapist/blacklist";
import { plugin as jsonapi } from "@hapist/json-api";
import { plugin as whitelist } from "@hapist/whitelist";
import rateLimit from "hapi-rate-limit";
import { IServer } from "./interfaces";
import { modules } from "./modules";

export class Server {
    private readonly logger: Logger.ILogger = app.resolvePlugin<Logger.ILogger>("logger");
    private http: IServer;
    private https: IServer;

    public constructor(private readonly config: Record<string, any>) {}

    public async start(): Promise<void> {
        if (this.config.http.enabled) {
            this.http = await createServer(this.config.http);
            this.http.app.config = this.config;

            this.registerPlugins("HTTP", this.http);
        }

        if (this.config.https.enabled) {
            this.https = await createServer(this.config.https);
            this.https.app.config = this.config;

            this.registerPlugins("HTTPS", this.https);
        }
    }

    public async stop(): Promise<void> {
        if (this.http) {
            this.logger.info(`Stopping Public HTTP API`);
            await this.http.stop();
        }

        if (this.https) {
            this.logger.info(`Stopping Public HTTPS API`);
            await this.https.stop();
        }
    }

    public async restart(): Promise<void> {
        if (this.http) {
            await this.http.stop();
            await this.http.start();
        }

        if (this.https) {
            await this.https.stop();
            await this.https.start();
        }
    }

    public instance(type: string): Hapi.Server {
        return this[type];
    }

    private async registerPlugins(name: string, server: Hapi.Server): Promise<void> {
        await server.register({
            plugin: rateLimit,
            options: this.config.rateLimit,
        });

        await server.register({
            plugin: whitelist,
            options: {
                whitelist: this.config.whitelist,
            },
        });

        await server.register({
            plugin: blacklist,
            options: {
                blacklist: this.config.blacklist,
            },
        });

        await server.register({ plugin: jsonapi, options: this.config.jsonapi });

        await server.register({ plugin: modules.generic });
        await server.register({ plugin: modules.delegate });
        await server.register({ plugin: modules.explorer });
        await server.register({ plugin: modules.exchange });
        await server.register({ plugin: modules.wallet });

        await mountServer(`JSON-API API (${name.toUpperCase()})`, server);
    }
}
