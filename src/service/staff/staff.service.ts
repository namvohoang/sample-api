
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/entity/staff.entity';
import { Repository } from 'typeorm';
import { StaffDTO } from 'src/dto/staff.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/dto/login.dto';

export type Staff = any;

@Injectable()
export class StaffService {
  private readonly staffs: Staff[];

  constructor(
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
    private readonly jwtService: JwtService
  ) {
    this.staffs = [
      {
        staffId: 1,
        staffname: 'john',
        password: 'changeme',
      },
      {
        staffId: 2,
        staffname: 'chris',
        password: 'secret',
      },
      {
        staffId: 3,
        staffname: 'maria',
        password: 'guess',
      },
    ];
  }

  async validateStaff(email: string, pass: string): Promise<any> {
    const staff = await this.findOneByEmail(email);
    if (staff && staff.password === pass) {
      const { password, ...result } = staff;
      return result;
    }
    return null;
  }

  async login(staff: LoginDTO) {
    this.validateStaff(staff.email, staff.password);
    const payload = { email: staff.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll(): Promise<StaffEntity[]> {
    return await this.staffRepository.find();
  }

  async findOneByEmail(email: string): Promise<Staff | undefined> {
    return this.staffs.find(staff => staff.email === email);
  }

  async findOne(uuid: any): Promise<any> {
    return await this.staffRepository.findByIds(uuid);
  }

  async create(data: StaffDTO): Promise<StaffEntity> {
    const staff = await this.staffRepository.create(data);
    try {
      return await this.staffRepository.save(staff);
    }
    catch(error) {
      throw new BadRequestException();
    }
  }
}