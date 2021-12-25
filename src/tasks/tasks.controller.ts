import { Body, Controller, Get, Post } from '@nestjs/common';
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
  createTask(@Body('title') title, @Body('description') description): Task {
    //@Body() body
    //console.log('body', body);

    return this.taskServices.createTask(title,description);

  }
}
