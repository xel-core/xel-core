export const defaults = {
    http: {
        enabled: true,
        host: "0.0.0.0",
        port: 3000,
    },

    https: {
        enabled: false,
        host: "0.0.0.0",
        port: 8443,
        tls: {
            key: process.env.CORE_API_SSL_KEY,
            cert: process.env.CORE_API_SSL_CERT,
        },
    },

    whitelist: ["*"],
    blacklist: [],

    jsonapi: {
        pagination: {
            routes: {},
        },
    },

    // @see https://github.com/wraithgar/hapi-rate-limit
    rateLimit: {
        enabled: !process.env.CORE_API_RATE_LIMIT,
        pathLimit: false,
        userLimit: process.env.CORE_API_RATE_LIMIT_USER_LIMIT || 300,
        userCache: {
            expiresIn: process.env.CORE_API_RATE_LIMIT_USER_EXPIRES || 60000,
        },
        ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
    },
};
