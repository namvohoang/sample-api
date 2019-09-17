import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as crypto from 'crypto';

@Entity({name: "staff"})
export class StaffEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  staffname: string;

  @Column()
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column()
  password: string;
}
