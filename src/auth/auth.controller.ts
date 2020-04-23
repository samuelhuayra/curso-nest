import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialsDto)
    }

    //From parameters
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@Req() req){
    //     console.log('>>>',req);
    //     // user: User {
    //     //     id: 1,
    //     //     username: 'samuel',
    //     //     password: '$2b$10$JvSI6NDaq/.m0elGMmnxJ.KE5VHqW/2tS3QqIyqRLXqFpdKBDDppO',
    //     //     salt: '$2b$10$JvSI6NDaq/.m0elGMmnxJ.'
    //     //   }
    // }

    //With custom decorator
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user:User){
    //     console.log('>>user: ',user);
    // }
}
