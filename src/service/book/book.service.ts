import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from 'src/entity/book.entity';
import { BookDTO } from 'src/dto/book.dto';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>
  ) {}

  async findAll(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async findOne(uuid: any): Promise<BookEntity[]> {
    return await this.bookRepository.findByIds(uuid);
  }

  async create(data: BookDTO): Promise<BookEntity> {
    const book = await this.bookRepository.create(data);
    try {
      return await this.bookRepository.save(book);
    }
    catch(error) {
      throw new BadRequestException();
    }
  }

  async update(id: any, data: any): Promise<any> {
    try {
      return await this.bookRepository.update(id, data);
    }
    catch(error) {
      throw new BadRequestException();
    }
  }

  async delete(id: any): Promise<any> {
    try {
      return await this.bookRepository.delete(id);
    }
    catch(error) {
      return error;
    }
  }
}
