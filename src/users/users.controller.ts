import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from '@nestjs/swagger';
import { SignupInputDto, SignupOutputDto } from './dto/signup.dto';

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
}
