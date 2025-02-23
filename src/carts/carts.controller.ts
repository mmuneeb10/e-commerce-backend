import {
  Controller,
  Get,
  Session,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiResponse } from '@nestjs/swagger';
import { GetMyCartOutputDto } from './dto/getMyCart.dto';
import { AppReq } from 'src/common/types';
import { AuthorizeGuard, OptionalAuthGuard } from 'src/common/jwt-auth.guard';
import {
  AddProductInCartInputDto,
  AddProductInCartOuputDto,
} from './dto/addProductInCart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}


  @UseGuards(OptionalAuthGuard)
  @Get('my')
  @ApiResponse({
    status: 200,
    type: GetMyCartOutputDto,
    description: 'Get My Cart',
  })
  async getMyCart(
    @Session() session: Record<string, any>,
    @Request() req: AppReq,
  ): Promise<GetMyCartOutputDto> {
    console.log('SESSION : ', session.id, session);
    const res = await this.cartsService.getMyCart(session.id, req.user?.id);
    return res;
  }

  @UseGuards(OptionalAuthGuard)
  @Post('add-product')
  @ApiResponse({
    status: 200,
    type: AddProductInCartOuputDto,
    description: 'add product in cart',
  })
  async addProductInCart(
    @Body() input: AddProductInCartInputDto,
    @Session() session: Record<string, any>,
    @Request() req: AppReq,
  ): Promise<AddProductInCartOuputDto> {
    await this.cartsService.addProductInCart(session.id, req.user?.id, input);
    return { success: true };
  }
}
