import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from "uuid/dist/v1";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {

    private tasks:Task[] = [];

    getTasks():Task[]{
        return this.tasks
    }

    getTasksWithFilters(filterDto:GetTaskFilterDto):Task[]{
        const {status, search} = filterDto

        let tasks = this.getTasks()

        if(status) tasks = tasks.filter(task=> task.status === status)
        if(search) tasks = tasks.filter(task=> task.title.includes(search) || task.description.includes(search))
        return tasks
    }

    getTaskById(id:string):Task{
        const found = this.tasks.find(task=> task.id === id)
        if(!found) throw new NotFoundException(`Task with ID "${id}" not found`)

        return found
    }

    createTask(createTaskDto:CreateTaskDto):Task{

        const {title, description} = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    deleteTaskById(id:string):void{
        this.getTaskById(id)
        this.tasks = this.tasks.filter(task=> task.id !== id)
    }

    updateTaskStatus(id:string,status:TaskStatus):Task{
        const  task = this.getTaskById(id)
        task.status = status
        return task
    }
}
