import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SigninInputDto {
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class SigninOutputDto {
  id: number;
  name: string;
  email: string;
  accessToken: string;
}
