import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto):Task[]{
        // console.log('>>>>filterDto: ',filterDto);
        // http://localhost:3000/tasks?status=OPEN&search=hello
        // >>>>filterDto:  { status: 'OPEN', search: 'hello' }
        // http://localhost:3000/tasks?status=IN_PROGRESS&search=Samuel

        if(Object.keys(filterDto).length) return this.tasksService.getTasksWithFilters(filterDto)
        else return this.tasksService.getTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        // @Body() body JSON body Only one Object

        // Separated
        // @Body('title') title: string,
        // @Body('description') description: string

        @Body() createTaskDto:CreateTaskDto
    ):Task{
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status',TaskStatusValidationPipe) status: TaskStatus,
    ){
        return this.tasksService.updateTaskStatus(id,status)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void{
        this.tasksService.deleteTaskById(id)
    }
}
