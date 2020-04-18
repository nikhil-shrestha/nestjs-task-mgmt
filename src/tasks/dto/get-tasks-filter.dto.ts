import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

import { TasksStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE])
  status: TasksStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
