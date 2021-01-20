import { collectDefaultMetrics, register } from 'prom-client'
import SocketIoCollector from './SocketIoCollector'
import * as io from 'socket.io'

interface PrometheusSocketIoConfig {
  io: io.Server
  collectDefaultMetrics?: boolean
}

export class PrometheusSocketIo {
  config: PrometheusSocketIoConfig

  static init(options: PrometheusSocketIoConfig): PrometheusSocketIo {
    return new PrometheusSocketIo(options)
  }

  constructor(options: PrometheusSocketIoConfig) {
    this.config = options

    if (options.collectDefaultMetrics) {
      this.collectDefaultMetrics()
    }
    this.collectSocketIoMetrics()
  }

  collectDefaultMetrics(): void {
    collectDefaultMetrics()
  }

  collectSocketIoMetrics(): void {
    SocketIoCollector.collectSocketIoMetrics(this.config.io)
  }

  async getMetrics(): Promise<string> {
    return await register.metrics()
  }
}
