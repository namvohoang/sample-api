
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffService } from 'src/service/staff/staff.service';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly staffService: StaffService) {
    super();
  }

  async validate(data: LoginDTO): Promise<any> {
    const staff = await this.staffService.validateStaff(data.email, data.password);
    if (!staff) {
      throw new UnauthorizedException();
    }
    return staff;
  }
}