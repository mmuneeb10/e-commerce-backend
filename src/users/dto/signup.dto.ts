import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SignupInputDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class SignupOutputDto {
  @IsBoolean()
  public success: boolean;
}
