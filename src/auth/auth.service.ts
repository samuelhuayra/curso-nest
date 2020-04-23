import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){}

    signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.userRepository.singUp(authCredentialsDto)
    }
    
    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)
        console.log(username);

        if(!username) throw new UnauthorizedException('Invalid credentials')

    }
}
