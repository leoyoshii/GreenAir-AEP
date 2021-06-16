import { ICreateComplaintPhotoDto } from '@modules/Complaint/dtos/ICreateComplaintPhotoDto';
import { IComplaintPhotoRepository } from '@modules/Complaint/interfaces/IComplaintPhotoRepository';
import { getRepository, Repository } from 'typeorm';
import { ComplaintPhoto } from '../entities/ComplaintPhoto';

export class ComplaintPhotoRepository implements IComplaintPhotoRepository {
  private ormRepository: Repository<ComplaintPhoto>;

  constructor() {
    this.ormRepository = getRepository(ComplaintPhoto);
  }
  public async create({
    complaintId,
    photoFilename,
  }: ICreateComplaintPhotoDto): Promise<ComplaintPhoto> {
    const photo = this.ormRepository.create({
      photo: photoFilename,
      complaintId,
    });

    return this.ormRepository.save(photo);
  }
  public async findById(id: string): Promise<ComplaintPhoto | undefined> {
    const photo = this.ormRepository.findOne({
      where: { id },
    });

    return photo;
  }
  public async save(data: ComplaintPhoto): Promise<ComplaintPhoto> {
    return this.ormRepository.save(data);
  }
}
