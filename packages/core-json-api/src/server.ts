import { app } from "@arkecosystem/core-container";
import { createSecureServer, createServer, mountServer } from "@arkecosystem/core-http-utils";
import { Logger } from "@arkecosystem/core-interfaces";
import Hapi from "@hapi/hapi";
import blacklist from "@hapist/blacklist";
import jsonapi from "@hapist/json-api";
import whitelist from "@hapist/whitelist";

export class Server {
    private logger = app.resolvePlugin<Logger.ILogger>("logger");

    private http: any;
    private https: any;

    public constructor(private config: any) {}

    public async start(): Promise<void> {
        const options = {
            host: this.config.host,
            port: this.config.port,
            routes: {
                validate: {
                    async failAction(request, h, err) {
                        throw err;
                    },
                },
            },
        };

        if (this.config.enabled) {
            this.http = await createServer(options);
            this.http.app.config = this.config;

            this.registerPlugins("HTTP", this.http);
        }

        if (this.config.ssl.enabled) {
            this.https = await createSecureServer(options, undefined, this.config.ssl);
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

        await server.register(jsonapi);

        for (const plugin of this.config.plugins) {
            if (typeof plugin.plugin === "string") {
                plugin.plugin = require(plugin.plugin);
            }

            await server.register(plugin);
        }

        await mountServer(`JSON-API API (${name.toUpperCase()})`, server);
    }
}
