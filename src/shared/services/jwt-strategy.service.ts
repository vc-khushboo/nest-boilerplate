import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as _ from 'lodash';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '../../shared/services/config.service';
import { CommonService } from './common.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( public readonly commonService: CommonService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: new ConfigService().get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.commonService.getOneByOptions('users', {
      email: payload.email,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return _.pick(user, [
      'id',
      'email'
    ]);
  }
}
