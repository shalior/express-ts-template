"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
exports.__esModule = true;
var serializable_error_1 = require("@cdellacqua/serializable-error");
function sanitizePath(path) {
    var sanitized = "/".concat(path.replace(/\/$/, '').replace(/^\//, ''));
    return sanitized === '/' ? '' : sanitized;
}
var config = {
    http: {
        hostname: process.env.HTTP_HOST,
        port: Number(process.env.HTTP_PORT),
        origin: (_a = process.env.HTTP_ORIGIN) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, ''),
        path: process.env.HTTP_PATH && sanitizePath(process.env.HTTP_PATH),
        baseUrl: "".concat((_b = process.env.HTTP_ORIGIN) === null || _b === void 0 ? void 0 : _b.replace(/\/$/, '')).concat(process.env.HTTP_PATH && sanitizePath(process.env.HTTP_PATH))
    },
    authentication: {
        tokenExpirationSeconds: Number(process.env.JWT_EXPIRATION_SECONDS)
    },
    environment: process.env.NODE_ENV,
    secret: process.env.SECRET,
    log: {
        level: process.env.LOG_LEVEL
    },
    shutdown: {
        interval: Number(process.env.SHUTDOWN_INTERVAL_SECONDS)
    },
    product: {
        name: process.env.PRODUCT_NAME,
        shortName: process.env.PRODUCT_SHORT_NAME,
        locale: process.env.PRODUCT_LOCALE
    },
    signedUrlExpirationSeconds: Number(process.env.SIGNED_URL_EXPIRATION_SECONDS),
    queue: {
        attempts: Number(process.env.QUEUE_MAX_ATTEMPTS),
        backoff: {
            type: process.env.QUEUE_BACKOFF_TYPE,
            delay: Number(process.env.QUEUE_BACKOFF_DELAY)
        }
    },
    smtp: {
        "default": {
            port: Number(process.env.SMTP_PORT),
            host: process.env.SMTP_HOST,
            ssl: process.env.SMTP_SSL,
            username: process.env.SMTP_USER,
            password: process.env.SMTP_PASS,
            from: process.env.SMTP_FROM
        }
    },
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST
    }
};
function recursiveCheck(obj, path) {
    if (path === void 0) { path = []; }
    Object.keys(obj).forEach(function (key) {
        if (obj[key] === undefined || Number.isNaN(obj[key])) {
            throw new serializable_error_1.SerializableError("missing env variable for config key \"".concat(__spreadArray(__spreadArray([], path, true), [key], false).join('.'), "\""));
        }
        else if (typeof obj[key] === 'object') {
            recursiveCheck(obj[key], __spreadArray(__spreadArray([], path, true), [key], false));
        }
    });
}
recursiveCheck(config);
exports["default"] = config;
