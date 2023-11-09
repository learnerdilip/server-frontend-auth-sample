import { Entity, Column, OneToMany } from 'typeorm';

import { User } from './user.entity';
import { Photo } from './photo.entity';

/**
 * Client entity
 */
@Entity()
export class Client extends User {
  @Column({
    nullable: false,
    default: 'https://cw-recruitment-tests.s3.amazonaws.com/avatar-1577909.svg',
  })
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.user, { cascade: true })
  photos: Photo[];
}
