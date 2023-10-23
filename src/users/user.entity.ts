import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MaxLength, MinLength, IsNumber } from 'class-validator';

export enum userRole {}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MinLength(2)
  @MaxLength(25)
  firstName: string;

  @Column()
  @MinLength(2)
  @MaxLength(25)
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(2)
  @MaxLength(25)
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @IsNumber()
  containsNumber(): boolean {
    return /\d/.test(this.password);
  }
}
