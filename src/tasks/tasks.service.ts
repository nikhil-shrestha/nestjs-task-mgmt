import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksStatus } from './task-staus.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User) {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException('Could not find task!');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User) {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException('Could not find task!');
    }
  }

  async updateTaskStatus(id: number, status: TasksStatus, user: User) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
