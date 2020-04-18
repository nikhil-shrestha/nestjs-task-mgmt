import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

import { Task, TasksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TasksStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new NotFoundException('Could not find task!');
    }

    this.tasks.splice(index, 1);
  }
}
