import * as socketIo from 'socket.io'
import Metrics from './metrics'

export default class SocketIoCollector {
  static collectSocketIoMetrics(io: socketIo.Server): void {
    io.on('connect', (socket: socketIo.Socket) => {
      SocketIoCollector.collectConcurrentConnections(socket)
      SocketIoCollector.collectTotalSentsMessages(socket, io)
    })
  }

  static collectConcurrentConnections(socket: socketIo.Socket): void {
    socket.on('disconnect', () => {
      Metrics.concurrentConnections.dec()
    })
    Metrics.concurrentConnections.inc()
  }

  static collectTotalSentsMessages(socket: socketIo.Socket, io: socketIo.Server): void {
    const orgEmit = socket.emit
    socket.emit = (event: string, ...args: any[]): boolean => {
      Metrics.totalSentsEvents.inc()
      return orgEmit.apply(socket, [event, ...args])
    }

    const orgServerEmit = io.emit
    io.emit = (event: string, ...args: any[]): boolean => {
      Metrics.totalSentsEvents.inc()
      return orgServerEmit.apply(io, [event, ...args])
    }
  }
}
