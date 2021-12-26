import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task, TaskStatus } from './tasks-status.enum';
import { TaskStatus } from './tasks-status.enum';
//import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksWithFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  //private tasks: Task[] = [];
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    ) {}
  
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskById(id: string): Task{
  //   const task = this.tasks.find((task) => task.id == id);
  //   if(!task){
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return task;
  // }
  async getTaskById(id: string): Promise<Task>{
    const task = await this.taskRepository.findOne(id);
    if(!task){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  // getTasksWithFilters(filterDto: GetTasksWithFilterDto): Task[]{
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if(status){
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if(search){
  //     tasks = tasks.filter((task) => {
  //       if(task.title.includes(search) || task.description.includes(search)){
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   return tasks;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    })
    await this.taskRepository.save(task);
    return task;
  }

  // updateTaskStatus(id: string, status: TaskStatus){
  //   const task = this.getTaskById(id);
  //   if(!task){
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   task.status = status;
  //   return task;
  // }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
    
    const task = await this.getTaskById(id);
    if(!task){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  // deleteTaskById(id: string): void{
  //   const task = this.getTaskById(id);
  //   if(!task){
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  async deleteTaskById(id: string): Promise<void>{
    const result = await this.taskRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

  }
}
