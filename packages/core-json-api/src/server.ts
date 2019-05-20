import { app } from "@arkecosystem/core-container";
import { createSecureServer, createServer, mountServer } from "@arkecosystem/core-http-utils";
import { Logger } from "@arkecosystem/core-interfaces";
import Hapi from "@hapi/hapi";
import { plugin as blacklist } from "@hapist/blacklist";
import { plugin as jsonapi } from "@hapist/json-api";
import { plugin as whitelist } from "@hapist/whitelist";
import rateLimit from "hapi-rate-limit";

export class Server {
    private logger = app.resolvePlugin<Logger.ILogger>("logger");

    private http: any;
    private https: any;

    public constructor(private readonly config: any) {}

    public async start(): Promise<void> {
        const options = {
            host: this.config.http.host,
            port: this.config.http.port,
            routes: {
                validate: {
                    async failAction(request, h, err) {
                        throw err;
                    },
                },
            },
        };

        if (this.config.http.enabled) {
            this.http = await createServer(options);
            this.http.app.config = this.config;

            this.registerPlugins("HTTP", this.http);
        }

        if (this.config.https.enabled) {
            this.https = await createSecureServer(options, undefined, this.config.https);
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
            // @ts-ignore
            plugin: whitelist,
            options: {
                whitelist: this.config.whitelist,
            },
        });

        await server.register({
            // @ts-ignore
            plugin: blacklist,
            options: {
                blacklist: this.config.blacklist,
            },
        });

        // @ts-ignore
        await server.register({ plugin: jsonapi, options: this.config.jsonapi });

        await mountServer(`JSON-API API (${name.toUpperCase()})`, server);
    }
}
