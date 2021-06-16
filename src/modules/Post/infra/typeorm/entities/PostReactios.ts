import { User } from '@modules/User/infra/typeorm/entities/User';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity('posts_reactions')
export class PostReactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'post_id' })
  postId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'boolean' })
  like: boolean;

  @Column({ type: 'boolean' })
  favorite: boolean;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  //relations
  @ManyToOne(() => Post, post => post.reactions)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, user => user.reactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
