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
import { Complaint } from './Complaint';

@Entity('complaints_photos')
export class ComplaintPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'complaint_id' })
  complaintId: string;

  @Exclude()
  @Column({ type: 'varchar' })
  photo: string;

  @Expose({ name: 'photoUrl' })
  getAvatarUrl(): string | null {
    if (!this.photo) {
      return null;
    }
    return `${process.env.APP_URL}/files/${this.photo}`;
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // relations
  @ManyToOne(() => Complaint)
  @JoinColumn({ name: 'complaint_id' })
  complaint: Complaint;
}
