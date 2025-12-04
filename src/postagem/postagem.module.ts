import { Module } from '@nestjs/common';
import { PostagemController } from './controllers/postagem.controller';
import { PostagemService } from './services/postagem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { TemaModule } from '../tema/entities/tema.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]),TemaModule ],
  providers: [PostagemService],
  controllers: [PostagemController],
  exports: [TypeOrmModule]
})
export class PostagemModule {}