import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "book"})
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  year: string;
}
