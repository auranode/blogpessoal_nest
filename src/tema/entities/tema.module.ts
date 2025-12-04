import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./tema.entity";
import { TemaController } from "../controllers/tema.controller";
import { TemaService } from "../services/tema.services";

@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    controllers: [TemaController],
    providers: [TemaService],
    exports: [TemaService]
})
export class TemaModule {}