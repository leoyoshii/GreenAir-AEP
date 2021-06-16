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

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'requester_id' })
  requesterId: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, name: 'position_lat' })
  positionLat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, name: 'position_lng' })
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
  @ManyToOne(() => User, user => user.complaints)
  @JoinColumn({ name: 'requester_id' })
  user: User;

  @OneToOne(() => Post, post => post.complaint)
  @JoinColumn({ name: 'post_id' })
  post: Post | null;
}
