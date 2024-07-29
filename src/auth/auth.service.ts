import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private usersModule: Model<User>) {}
  async create(createAuthDto: CreateAuthDto) {
    const user = await this.usersModule.create(createAuthDto);
    const savedUser = user.save();
    if (!savedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return savedUser;
  }

  findAll() {
    return this.usersModule.find();
  }

  async findOne(id) {
    const user = await this.usersModule.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.usersModule
      .findByIdAndUpdate(id, updateAuthDto, { new: true })
      .exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async remove(id: number) {
    const removeUser = await this.usersModule.deleteOne({ _id: id }).exec();
    if (!removeUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return 'User successfully deleted';
  }
}
