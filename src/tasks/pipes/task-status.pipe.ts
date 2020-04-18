import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TasksStatus } from '../task-staus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowStatuses = [
    TasksStatus.OPEN,
    TasksStatus.IN_PROGRESS,
    TasksStatus.DONE,
  ];
  transform(value: any) {
    console.log({ value });

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowStatuses.indexOf(status);
    return idx !== -1;
  }
}
