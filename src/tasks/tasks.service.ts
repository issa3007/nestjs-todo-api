import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from 'src/tasks/tasks.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepo: TasksRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    const user = await this.usersRepo.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const userTask = {
      ...createTaskDto,
      user,
    };

    return await this.tasksRepo.create(userTask);
  }

  async findOne(id: number) {
    const task = await this.tasksRepo.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not  found');
    }

    return task;
  }

  async findAllTasks(isCompleted?: string, userId?: number) {
    return await this.tasksRepo.findAllWithFilter(isCompleted, userId);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksRepo.update(id, updateTaskDto);

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }

    return updatedTask;
  }

  async removeTask(id: number) {
    const result = await this.tasksRepo.remove(id);

    if (!result) {
      throw new NotFoundException('Task not found');
    }

    return { message: 'Task successfully deleted' };
  }
}
