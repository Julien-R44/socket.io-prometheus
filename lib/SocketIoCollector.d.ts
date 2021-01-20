import * as socketIo from 'socket.io';
export default class SocketIoCollector {
    static collectSocketIoMetrics(io: socketIo.Server): void;
    static collectConcurrentConnections(socket: socketIo.Socket): void;
    static collectTotalSentsMessages(socket: socketIo.Socket, io: socketIo.Server): void;
}
