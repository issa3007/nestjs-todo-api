import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepo.create(createUserDto);
    return await this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find({ relations: ['tasks'] });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) return null;
    Object.assign(user, updateUserDto);
    return await this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) return false;
    return this.usersRepo.delete(id);
  }
}
