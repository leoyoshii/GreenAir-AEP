import { Post } from '@modules/Post/infra/typeorm/entities/Post';
import { User } from '@modules/User/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('suggestions')
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'requester_id' })
  requesterId: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  positionLat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  positionLng: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'uuid', name: 'post_id', nullable: true })
  postId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'requester_id' })
  user: User;

  @OneToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post | null;
}
