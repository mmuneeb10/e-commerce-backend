import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column({ unique: true })
  email: number;

  @Column
  emailVerificationCode: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  emailVerified: boolean;
}
