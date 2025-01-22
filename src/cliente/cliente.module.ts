import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
    controllers: [TypeOrmModule],
    providers: [],
    imports: [TypeOrmModule],
    exports: [TypeOrmModule],
})
export class ClienteModule {};