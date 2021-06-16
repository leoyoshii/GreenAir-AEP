import { EnumStatusFriendship } from '@modules/User/interfaces/EnumStatusFriendship';

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
import { User } from './User';

@Entity('friendship')
export class Friendship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'requester_id' })
  requesterId: string;

  @Column({ type: 'uuid', name: 'requested_id' })
  requestedId: string;

  @Column({ type: 'enum', enum: EnumStatusFriendship })
  status: EnumStatusFriendship;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  //Relations
  @ManyToOne(() => User, user => user.requester)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, user => user.requested)
  @JoinColumn({ name: 'requested_id' })
  requested: User;
}
