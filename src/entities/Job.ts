import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { Application } from './Application';
import { Base } from './Base';
import { User } from './User';

@Entity({ name: 'jobs' })
export class Job extends Base {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.jobs, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Application, (application) => application.job, { cascade: true })
  applications: Application[];
}
