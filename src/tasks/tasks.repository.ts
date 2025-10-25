import { Injectable,} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepo.create(createTaskDto);
    return await this.tasksRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    return task || null;
  }

  async findAllWithFilter(
    isCompleted?: string,
    userId?: number,
  ): Promise<Task[]> {
    const query = this.tasksRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user');

    if (isCompleted !== undefined) {
      const completed = isCompleted === 'true';
      query.andWhere('task.isCompleted = :completed', { completed });
    }

    if (userId !== undefined) {
      query.andWhere('user.id = :userId', { userId });
    }
    query.orderBy('task.createdAt', 'DESC');

    return await query.getMany();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) return null;
    Object.assign(task, updateTaskDto);
    return await this.tasksRepo.save(task);
  }

  async remove(id: number) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) return false;
    return this.tasksRepo.delete(id);
  }
}
