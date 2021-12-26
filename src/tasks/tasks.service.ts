import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksWithFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    ) {}

  getTasks(filterDto: GetTasksWithFilterDto): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Task>{
    return this.taskRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
    return this.taskRepository.updateTaskStatus(id, status);
  }
  
  deleteTaskById(id: string): Promise<void>{
    return this.taskRepository.deleteTaskById(id);
  }

}
