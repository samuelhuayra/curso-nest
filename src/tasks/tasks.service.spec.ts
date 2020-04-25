import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { NotFoundException } from "@nestjs/common";

const mockUser = { id:12, username: 'Test user' }

const mockTaskRepository = ()=>({
// TaskRepository Simular el TaskRepository 
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn()
})

describe('TasksService',()=>{
    let tasksService;
    let tasksRepository;

    beforeEach(async()=>{
        const module = await Test.createTestingModule({
            providers:[
                TasksService,
                {provide:TaskRepository,useFactory:mockTaskRepository}, //Pasamoso otro TaskRepository
            ]
        }).compile()

        tasksService = await module.get<TasksService>(TasksService)
        tasksRepository = await module.get<TaskRepository>(TaskRepository)
    })

    describe('getTasks',()=>{
        it('get all tasks from the repository',async()=>{
            tasksRepository.getTasks.mockResolvedValue('Some value')

            expect(tasksRepository.getTasks).not.toHaveBeenCalled()
            const filters: GetTaskFilterDto = {status: TaskStatus.IN_PROGRESS, search:''}
            const result = await tasksService.getTasks(filters,mockUser)
            expect(tasksRepository.getTasks).toHaveBeenCalled()
            expect(result).toEqual('Some value')

        })
    })
    describe('getTaskById',()=>{
        it('calls tasksRepository.findOne() and succesfully retrive and return the task',async()=>{
            tasksRepository.getTasks.mockResolvedValue('Some value')

            expect(tasksRepository.getTasks).not.toHaveBeenCalled()
            const filters: GetTaskFilterDto = {status: TaskStatus.IN_PROGRESS, search:''}
            const result = await tasksService.getTasks(filters,mockUser)
            expect(tasksRepository.getTasks).toHaveBeenCalled()
            expect(result).toEqual('Some value')

        })
        it('throwns an error as task is not found',async()=>{
            const mockTask = {title:'Test task', description: 'Test desc'}
            tasksRepository.findOne.mockResolvedValue(mockTask)

            const result = await tasksService.getTaskById(1,mockUser)
            expect(result).toEqual(mockTask)

            expect(tasksRepository.findOne).toHaveBeenCalledWith({where:{id:1,userId:mockUser.id}})
        })
        it('throws an error as task is not found',async()=>{
            tasksRepository.findOne.mockResolvedValue(null)
            expect(tasksService.getTaskById(1,mockUser)).rejects.toThrow(NotFoundException)
        })
    })

    describe('createTask',()=>{
        it('calls taskRepository.create() and returns the result',async()=>{
            tasksRepository.createTask.mockResolvedValue('someTask')
            expect(tasksRepository.createTask).not.toHaveBeenCalled()
            const createTaskDto = {title:'Test task', description: 'Test desc'}
            const result = await tasksService.createTask(createTaskDto,mockUser)
            expect(tasksRepository.createTask).toHaveBeenCalledWith(createTaskDto,mockUser)
            
            expect(result).toEqual('someTask')
        })
    })

    describe('deleteTask',()=>{
        it('calls taskRepository.deleteTask() to delete a task',async()=>{
            tasksRepository.delete.mockResolvedValue({afected:1})
            expect(tasksRepository.delete).not.toHaveBeenCalled()
            await tasksService.deleteTask(1,mockUser)
            expect(tasksRepository.delete).toHaveBeenCalledWith({id:1,userId:mockUser.id})
        })
        it('thorw an error as task could not be found',async()=>{
            tasksRepository.delete.mockResolvedValue({afected:0})
            expect(tasksService.deleteTask(1,mockUser)).rejects.toThrow(NotFoundException)

        })
    })
    
    describe('updateTaskStatus',()=>{
        it('update a task status',async()=>{
            const save = jest.fn().mockResolvedValue(true)
            tasksService.getTaskById = jest.fn().mockResolvedValue({
                status: TaskStatus.OPEN,
                save
            })
            expect(tasksService.getTaskById).not.toHaveBeenCalled()
            expect(save).not.toHaveBeenCalled()
            const result = await tasksService.updateTaskStatus(1,TaskStatus.DONE,mockUser)
            expect(tasksService.getTaskById).toHaveBeenCalled()
            expect(save).toHaveBeenCalled()
            expect(result.status).toEqual(TaskStatus.DONE)
        })
    })
})
