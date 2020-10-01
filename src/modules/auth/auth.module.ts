import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../shared/services/jwt-strategy.service';
import { ConfigService } from '../../shared/services/config.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule} from '../../shared/shared.module';
import { CommonService } from '../../shared/services/common.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, 
      JwtStrategy, 
      CommonService],
  imports: [
    SharedModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule], 
      useFactory: (configService: ConfigService) => ({
          secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
          signOptions: {
              expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
          },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService, JwtModule],
})
export class AuthModule {}
