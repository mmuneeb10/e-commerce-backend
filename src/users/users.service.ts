import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupInputDto } from './dto/signup.dto';
import { Crypt } from 'src/common/crypt';
import { SigninInputDto, SigninOutputDto } from './dto/signin.dto';
import { AuthHelper } from '../common/auth.helper';
import { GetMyProfileOutputDto } from './dto/getMyProfile.dto';

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

  async signin(input: SigninInputDto): Promise<SigninOutputDto> {
    const data = await this.usersRepository.findOne({
      where: { email: input.email },
    });
    const user: User = data?.dataValues;

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const passCorrect = await Crypt.compare(input.password, user.password);

    if (!passCorrect) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = await this.createAccessToken(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken,
    };
  }

  async createAccessToken(user: User): Promise<string> {
    const accessToken = await AuthHelper.createAccessToken(user.name, user.id);
    return accessToken;
  }

  async getMyProfile(id: number): Promise<GetMyProfileOutputDto> {
    const data = await this.usersRepository.findOne({
      where: { id },
    });
    return data?.dataValues;
  }
}
