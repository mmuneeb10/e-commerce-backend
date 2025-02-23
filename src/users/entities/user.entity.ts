import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;
}
