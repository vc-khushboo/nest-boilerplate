import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UtilsService } from '../../shared/providers/utils.service';
import Message from '../../shared/messages/message';
import { CommonService } from '../../shared/services/common.service';
import { UserLogin } from './auth.interface';

@Injectable()
export class AuthService {

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly commonService: CommonService
    ) { }

    async login(user: UserLogin): Promise<any> {
        try{
            const userEntity = await this.validateUser(user);
    
            const responseData = {
                id: userEntity.id,
                email: userEntity.email
            }
            const token = await this.createToken(userEntity);
            return UtilsService.sendSuccessResponse(
                { 'token': token.accessToken, 'user': responseData },
                HttpStatus.OK,
                true
            )
        }catch(error) {
            throw error;
        }
    }

    async createToken(user: User): Promise<any> {
        return {
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({ email: user.email }),
        };
    }

    async validateUser(userLoginDto: { email: string, password: string }): Promise<User> {
        const user:any = await this.commonService.getOneByOptions('users', {
            email: userLoginDto.email,
        });
        if (!user) {
            throw new NotFoundException({
                status: HttpStatus.FORBIDDEN,
                message: Message.USERNOTFOUND
            });
        }

        const isPasswordValid = await UtilsService.validateHash(
            userLoginDto.password,
            user && user.password,
        );
        if (!user || !isPasswordValid) {

            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: Message.INVALIDCREDENTIALS
            }, HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    async register(user: UserLogin): Promise<any> {
        try{
            await this.commonService.insert('users', user);
            return UtilsService.sendSuccessResponse(
                'success',
                HttpStatus.OK,
                true
            )
        }catch(error) {
            throw error;
        }
    }
}
