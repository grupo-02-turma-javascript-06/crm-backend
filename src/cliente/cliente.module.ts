import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Cliente } from "./entities/cliente.entity";
import { ClienteService } from "./services/cliente.service";
import { ClienteController } from "./controllers/cliente.controller";

@Module({
    controllers: [TypeOrmModule, ClienteController],
    providers: [ClienteService],
    imports: [TypeOrmModule.forFeature([Cliente])],
    exports: [TypeOrmModule, ClienteService],
})
export class ClienteModule {};