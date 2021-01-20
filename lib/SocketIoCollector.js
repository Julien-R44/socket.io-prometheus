"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("./metrics");
class SocketIoCollector {
    static collectSocketIoMetrics(io) {
        io.on('connect', (socket) => {
            SocketIoCollector.collectConcurrentConnections(socket);
            SocketIoCollector.collectTotalSentsMessages(socket, io);
        });
    }
    static collectConcurrentConnections(socket) {
        socket.on('disconnect', () => {
            metrics_1.default.concurrentConnections.dec();
        });
        metrics_1.default.concurrentConnections.inc();
    }
    static collectTotalSentsMessages(socket, io) {
        const orgEmit = socket.emit;
        socket.emit = (event, ...args) => {
            metrics_1.default.totalSentsEvents.inc();
            return orgEmit.apply(socket, [event, ...args]);
        };
        const orgServerEmit = io.emit;
        io.emit = (event, ...args) => {
            metrics_1.default.totalSentsEvents.inc();
            return orgServerEmit.apply(io, [event, ...args]);
        };
    }
}
exports.default = SocketIoCollector;
