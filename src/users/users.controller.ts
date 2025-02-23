import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from '@nestjs/swagger';
import { SignupInputDto, SignupOutputDto } from './dto/signup.dto';
import { SigninInputDto, SigninOutputDto } from './dto/signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiResponse({
    status: 200,
    type: SignupOutputDto,
    description: 'User Signup',
  })
  async signup(@Body() input: SignupInputDto): Promise<SignupOutputDto> {
    await this.usersService.signup(input);

    return { success: true };
  }

  @Post('signin')
  @ApiResponse({
    status: 200,
    type: SigninOutputDto,
    description: 'User Signup',
  })
  async signin(@Body() input: SigninInputDto): Promise<SigninOutputDto> {
    const res = await this.usersService.signin(input);
    return res;
  }
}
