import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SignupInputDto, SignupOutputDto } from './dto/signup.dto';
import { SigninInputDto, SigninOutputDto } from './dto/signin.dto';
import { GetMyProfileOutputDto } from './dto/getMyProfile.dto';
import { AuthorizeGuard } from 'src/common/jwt-auth.guard';
import { AppReq } from 'src/common/types';

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

  @ApiBearerAuth()
  @UseGuards(AuthorizeGuard)
  @Get('me')
  @ApiResponse({
    status: 200,
    type: GetMyProfileOutputDto,
    description: 'User Signup',
  })
  async getMyProfile(@Request() req: AppReq): Promise<GetMyProfileOutputDto> {
    const res = await this.usersService.getMyProfile(req.user.id);
    return res;
  }
}
