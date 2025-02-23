import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupInputDto } from './dto/signup.dto';
import { Crypt } from 'src/common/crypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async signup(input: SignupInputDto): Promise<void> {
    const alreadyExists = await this.usersRepository.findOne({
      where: { email: input.email },
    });
    if (alreadyExists) {
      throw new BadRequestException('Alredy signed up with this email');
    }
    const password =
      input.password && (await Crypt.hashString(input?.password));

    await this.usersRepository.create({
      name: input.name,
      password,
      email: input.email,
    });
  }
}
