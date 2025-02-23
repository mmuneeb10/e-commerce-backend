import { IsNumber, IsOptional } from 'class-validator';

export class AddProductInCartInputDto {
  @IsNumber()
  public productId: number;

  @IsOptional()
  @IsNumber()
  public cartId: string;
}

export class AddProductInCartOuputDto {
  success: boolean;
}
