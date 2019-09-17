import { Controller, UseGuards, Post, Request, Get, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StaffService } from 'src/service/staff/staff.service';
import { LoginDTO } from 'src/dto/login.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  //@UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.staffService.login(data);
  }

  //@UseGuards(AuthGuard('jwt'))
  /* @Get('me')
  findOne(@Request() req) {
    return req.user;
  } */
}
