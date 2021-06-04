import { EnumUserGender } from '@modules/User/IRepositories/EnumUserGender';
import { EnumUserRole } from '@modules/User/IRepositories/EnumUserRole';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Friendship } from './Friendship';
import { Complaint } from '@modules/Complaint/infra/typeorm/entities/Complaint';
import { Post } from '@modules/Post/infra/typeorm/entities/Post';
import { Suggestion } from '@modules/Suggestion/infra/typeorm/entities/Suggestion';
import { PostReactions } from '@modules/Post/infra/typeorm/entities/PostReactios';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'varchar', nullable: true })
  biografy: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true, name: 'area_code_phone' })
  areaCodePhone: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.APP_URL}/files/${this.avatar}`;
  }

  @Column({ type: 'enum', enum: EnumUserGender })
  gender: EnumUserGender;

  @Column({ type: 'varchar', name: 'other_gender', nullable: true })
  otherGender: string;

  @Column({ type: 'enum', enum: EnumUserRole })
  role: EnumUserRole;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  //relations
  @OneToMany(() => Friendship, friendship => friendship.requester)
  requester: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.requested)
  requested: Friendship[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Complaint, complaint => complaint.user)
  complaints: Complaint[];

  @OneToMany(() => Suggestion, suggestion => suggestion.user)
  suggestion: Suggestion[];

  @OneToMany(() => PostReactions, reaction => reaction.user)
  reactions: PostReactions[];
}
