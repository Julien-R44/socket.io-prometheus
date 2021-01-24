import * as socketIo from 'socket.io'
import Metrics from './metrics'
import Helpers from './helpers'

export default class SocketIoCollector {
  static collectSocketIoMetrics(io: socketIo.Server): void {
    io.on('connect', (socket: socketIo.Socket) => {
      SocketIoCollector.collectConcurrentConnections(socket)
      SocketIoCollector.collectTotalSentsMessages(socket, io)
      SocketIoCollector.collectTotalReceivedMessages(socket, io)
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
      Metrics.totalSentsBytes.inc(Helpers.dataToBytes(args))
      return orgEmit.apply(socket, [event, ...args])
    }

    const orgServerEmit = io.emit
    io.emit = (event: string, ...args: any[]): boolean => {
      Metrics.totalSentsEvents.inc()
      Metrics.totalSentsBytes.inc(Helpers.dataToBytes(args))
      return orgServerEmit.apply(io, [event, ...args])
    }
  }

  static collectTotalReceivedMessages(socket: socketIo.Socket, io: socketIo.Server): void {
    socket.onAny((...args: any[]) => {
      const [eventName, message] = args

      Metrics.totalReceivedEvents.inc()
      Metrics.totalReceivedBytes.inc(Helpers.dataToBytes(message))
    })
  }
}
