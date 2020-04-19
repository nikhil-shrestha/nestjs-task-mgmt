import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksStatus } from './task-staus.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto) {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Could not find task!');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Could not find task!');
    }
  }

  async updateTaskStatus(id: number, status: TasksStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
