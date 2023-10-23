// src/users/user.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';

@Entity()
export class Client extends User {
  @Column()
  avatar: string;

  @Column({ type: 'text', array: true })
  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
