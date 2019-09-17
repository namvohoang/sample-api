import { Module } from '@nestjs/common';
import { StaffService } from 'src/service/staff/staff.service';
import { StaffController } from 'src/controller/staff/staff.controller';
import { StaffEntity } from 'src/entity/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/configuration/constants';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [StaffService, LocalStrategy, JwtStrategy],
  exports: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
