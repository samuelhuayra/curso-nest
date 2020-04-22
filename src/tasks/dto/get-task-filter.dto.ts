import { TaskStatus } from "../task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";


export class GetTaskFilterDto {
    @IsOptional()
    @IsIn(Object.keys(TaskStatus))
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}