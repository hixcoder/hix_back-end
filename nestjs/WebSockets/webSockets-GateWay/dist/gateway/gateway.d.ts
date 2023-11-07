import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
export declare class MyGateway implements OnModuleInit {
    onModuleInit(): void;
    server: Server;
    onNewMessage(body: any): void;
}
