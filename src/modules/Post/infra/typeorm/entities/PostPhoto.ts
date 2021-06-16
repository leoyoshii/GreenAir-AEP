import { Exclude, Expose } from 'class-transformer';
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

@Entity('posts_photos')
export class PostPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'post_id' })
  postId: string;

  @Exclude()
  @Column({ type: 'varchar' })
  photo: string;

  @Expose({ name: 'photoUrl' })
  getPhotoUrl(): string | null {
    if (!this.photo) {
      return null;
    }
    return `${process.env.APP_URL}/files/${this.photo}`;
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  //relations
  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
