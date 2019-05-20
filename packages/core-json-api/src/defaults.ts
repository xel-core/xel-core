export const defaults = {
    http: {
        enabled: true,
        host: "0.0.0.0",
        port: 3000,
    },

    https: {
        enabled: true,
        host: "0.0.0.0",
        port: 8443,

        key: process.env.CORE_API_SSL_KEY,
        cert: process.env.CORE_API_SSL_CERT,
    },

    whitelist: ["*"],
    blacklist: [],

    jsonapi: {
        pagination: {
            routes: {},
        },
    },
};
