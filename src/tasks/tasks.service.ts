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
  getTasks(filterDto: GetTasksWithFilterDto): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto);
  }

  // getTaskById(id: string): Task{
  //   const task = this.tasks.find((task) => task.id == id);
  //   if(!task){
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return task;
  // }
  getTaskById(id: string): Promise<Task>{
    return this.taskRepository.getTaskById(id);
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

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
    return this.taskRepository.updateTaskStatus(id, status);
  }
  

  // deleteTaskById(id: string): void{
  //   const task = this.getTaskById(id);
  //   if(!task){
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  deleteTaskById(id: string): Promise<void>{
    return this.taskRepository.deleteTaskById(id);
  }

}
