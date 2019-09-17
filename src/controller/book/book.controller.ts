import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BookService } from 'src/service/book/book.service';
import { BookDTO } from 'src/dto/book.dto';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService
  ) {}

  @Get()
  findAll(): Promise<any> {
    return this.bookService.findAll();
  }

  @Get(':uuid')
  findOne(@Param() params: any) {
    return this.bookService.findOne(params.uuid);
  }

  @Post()
  create(@Body() data: BookDTO): Promise<BookDTO> {
    return this.bookService.create(data);
  }

  @Put(':uuid')
  update(@Param() params: any, @Body() data: BookDTO) {
    return this.bookService.update(params.uuid, data);
  }
  
  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.bookService.delete(uuid);
  }
}
