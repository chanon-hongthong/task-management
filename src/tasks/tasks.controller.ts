import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
