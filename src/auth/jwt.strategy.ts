import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        })
    }

    async validate(payload:JwtPayload){
        const {username} = payload
        const user =  await this.userRepository.findOne({username}) //OJO con esta validación de token porque consulta Bd en cada peticion
        if(!user) throw new UnauthorizedException()
        // console.log('>>>',user); //OJO saca tasks mas
        return user

        //En el Request pondra la informacion del user en el Request
        // @Post('/test')
        // @UseGuards(AuthGuard())
        // test(@Req() req){
        //     console.log(req);
        //     user: User {
        //         id: 1,
        //         username: 'samuel',
        //         password: '$2b$10$JvSI6NDaq/.m0elGMmnxJ.KE5VHqW/2tS3QqIyqRLXqFpdKBDDppO',
        //         salt: '$2b$10$JvSI6NDaq/.m0elGMmnxJ.'
        //       }
        // }
    }
}