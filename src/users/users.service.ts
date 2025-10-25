import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepo.create(createUserDto);
  }

  async findAllUsers() {
    return await this.usersRepo.findAll();
  }

  async findOneUser(id: number) {
    const user = await this.usersRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepo.update(id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async removeUser(id: number) {
    const result = await this.usersRepo.remove(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User successfully deleted' };
  }
}
