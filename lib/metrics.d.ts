import { Counter, Gauge } from 'prom-client';
declare const Metrics: {
    concurrentConnections: Gauge<string>;
    totalSentsEvents: Counter<string>;
};
export default Metrics;
