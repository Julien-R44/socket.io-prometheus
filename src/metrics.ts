import { Counter, Gauge } from 'prom-client'

const Metrics = {
  concurrentConnections: new Gauge({
    name: 'socket_io_concurrent_connections',
    help: 'Number of current connections'
  }),
  totalSentsEvents: new Counter({
    name: 'socket_io_total_sents_events',
    help: 'The total number of events sent from the server'
  })
}

export default Metrics
