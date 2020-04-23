import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type=> User,//nTasks-1User
        user=> user.tasks,//1User-nTasks
        {eager: false})
    user: User;

    @Column()
    userId: number;
}