"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusSocketIo = void 0;
const prom_client_1 = require("prom-client");
const SocketIoCollector_1 = require("./SocketIoCollector");
class PrometheusSocketIo {
    constructor(options) {
        this.config = options;
        if (options.collectDefaultMetrics) {
            this.collectDefaultMetrics();
        }
        this.collectSocketIoMetrics();
    }
    static init(options) {
        return new PrometheusSocketIo(options);
    }
    collectDefaultMetrics() {
        prom_client_1.collectDefaultMetrics();
    }
    collectSocketIoMetrics() {
        SocketIoCollector_1.default.collectSocketIoMetrics(this.config.io);
    }
    async getMetrics() {
        return await prom_client_1.register.metrics();
    }
}
exports.PrometheusSocketIo = PrometheusSocketIo;
