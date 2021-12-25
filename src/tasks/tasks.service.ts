import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksWithFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task{
    const task = this.tasks.find((task) => task.id == id);

    if(!task){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksWithFilterDto): Task[]{
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if(status){
      tasks = tasks.filter((task) => task.status === status);
    }

    if(search){
      tasks = tasks.filter((task) => {
        if(task.title.includes(search) || task.description.includes(search)){
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus){
    const task = this.getTaskById(id);
    if(!task){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  deleteTaskById(id: string): void{
    const task = this.getTaskById(id);
    if(!task){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
