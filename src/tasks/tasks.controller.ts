import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskServices.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.taskServices.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //sample 1 @Body() body
    //console.log('body', body);

    //sample 2 simple way good way use DTO(Data Transfer Object)
    //createTask(@Body('title') title, @Body('description') description): Task {}

    //sample DTO
    //createTask(@Body createTaskDto: CreateTaskDto): Task {}

    return this.taskServices.createTask(createTaskDto);

  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string): void{
    return this.taskServices.deleteTaskById(id);
  }
}
