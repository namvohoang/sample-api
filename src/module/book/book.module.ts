import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entity/book.entity';
import { BookService } from 'src/service/book/book.service';
import { BookController } from 'src/controller/book/book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
