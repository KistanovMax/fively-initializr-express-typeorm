import { Entity, Column, OneToMany, Index } from 'typeorm';

import { Base } from './Base';
import { Job } from './Job';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class User extends Base {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Job, (job) => job.user, { cascade: true })
  jobs: Job[];
}
