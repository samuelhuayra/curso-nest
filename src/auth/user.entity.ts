import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Task } from "../tasks/task.entity";

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

    @OneToMany(type=>Task, //1User-nTasks
        task=>task.user,//nTasks-1User
        {eager:true}) //
    tasks:Task[]

    async validatePassword(password:string):Promise<boolean>{
        return this.password === await bcrypt.hash(password,this.salt)
    }
}