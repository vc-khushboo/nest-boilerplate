import { Controller, Post, HttpStatus, Body, UsePipes,  HttpCode } from '@nestjs/common';

//services
import { AuthService } from './auth.service';
import AuthSchemas from './auth.validator';
import { JoiValidationPipe } from '../../shared/pipes/joi-validation.pipe';
import { UserLogin } from './auth.interface';

@Controller('auth')
export class AuthController {

    constructor(
        public readonly authService: AuthService
    ) { }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiValidationPipe(AuthSchemas.LOGIN))
    async userLogin(
        @Body() userLoginDto: UserLogin
    ): Promise<any> {
        return  this.authService.login(userLoginDto);
    }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiValidationPipe(AuthSchemas.LOGIN))
    async userRegister(
        @Body() userLoginDto: UserLogin
    ): Promise<any> {
        return  this.authService.register(userLoginDto);
    }
}
