import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async singUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const { username, password } = authCredentialsDto

        const user = new User()
        user.username=username
        user.password=password
        try {
            // Unique username
            await user.save()
        } catch (error) {
            console.log('error>>',error);
            if(error.code === '23505') //Duplicated username
                throw new ConflictException('Username already exists')
            else
                throw new InternalServerErrorException()
        }
    }
}