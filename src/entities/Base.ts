import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ select: false, name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ select: false, name: 'deleted_at' })
  deletedAt: Date;
}
