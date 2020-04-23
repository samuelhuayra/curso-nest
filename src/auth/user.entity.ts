import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username']) //username deberia ser unico error 500 -> query error.code 23505
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string
    @Column()
    salt:string

    async validatePassword(password:string):Promise<boolean>{
        return this.password === await bcrypt.hash(password,this.salt)
    }
}