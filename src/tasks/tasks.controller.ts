import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksWithFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

//import { Task,TaskStatus } from './tasks-status.enum';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksWithFilterDto): Task[] {
  //   //## Sample Query
  //   //## http://localhost:3000/task?status=OPEN&search=""

  //   //## if we have any filters defined, call tasksService.getTasksFilters
  //   //## otherwise, just get all tasks
  //   if(Object.keys(filterDto).length){
  //     return this.taskServices.getTasksWithFilters(filterDto);
  //   }else{
  //     return this.taskServices.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task{
  //   return this.taskServices.getTaskById(id);
  // }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskServices.getTaskById(id);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   //##sample 1 @Body() body
  //   //##console.log('body', body);

  //   //##sample 2 simple way good way use DTO(Data Transfer Object)
  //   //##createTask(@Body('title') title, @Body('description') description): Task {}

  //   //##sample DTO
  //   //##createTask(@Body createTaskDto: CreateTaskDto): Task {}

  //   return this.taskServices.createTask(createTaskDto);

  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskServices.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskServices.updateTaskStatus(id, status);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id:string): void{
  //   return this.taskServices.deleteTaskById(id);
  // }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskServices.deleteTaskById(id);
  }
}
