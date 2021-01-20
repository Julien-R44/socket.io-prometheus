import * as io from 'socket.io';
interface PrometheusSocketIoConfig {
    io: io.Server;
    collectDefaultMetrics?: boolean;
}
export declare class PrometheusSocketIo {
    config: PrometheusSocketIoConfig;
    static init(options: PrometheusSocketIoConfig): PrometheusSocketIo;
    constructor(options: PrometheusSocketIoConfig);
    collectDefaultMetrics(): void;
    collectSocketIoMetrics(): void;
    getMetrics(): Promise<string>;
}
export {};
