import { Entity, Column, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Job } from './Job';

@Entity({ name: 'applications' })
export class Application extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column('text')
  text: string;

  @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE' })
  job: Job;
}
