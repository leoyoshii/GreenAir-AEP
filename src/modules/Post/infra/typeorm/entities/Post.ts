import { Complaint } from '@modules/Complaint/infra/typeorm/entities/Complaint';
import { Suggestion } from '@modules/Suggestion/infra/typeorm/entities/Suggestion';
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
import { PostPhoto } from './PostPhoto';
import { PostReactions } from './PostReactios';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'owner_id' })
  ownerId: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  text: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // relations
  @OneToMany(() => PostPhoto, photo => photo.post)
  photos: PostPhoto;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @OneToOne(() => Complaint, complaint => complaint.post)
  complaint: Complaint | null;

  @OneToOne(() => Suggestion, suggestion => suggestion.post)
  suggestion: Suggestion | null;

  @OneToMany(() => PostReactions, reaction => reaction.post)
  reactions: PostReactions[];
}
