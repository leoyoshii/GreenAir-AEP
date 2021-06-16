import IStorageProvider from '@shared/container/providers/StorageProvider/interface/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { ICreateComplaintDto } from '../dtos/ICreateComplaintDto';
import { Complaint } from '../infra/typeorm/entities/Complaint';
import { IComplaintPhotoRepository } from '../interfaces/IComplaintPhotoRepository';
import { IComplaintRepository } from '../interfaces/IComplaintRepository';

interface ICreateComplaintServiceDto extends ICreateComplaintDto {
  arrayPhotos: string[];
}

@injectable()
export class CreateComplaintService {
  constructor(
    @inject('ComplaintRepository')
    private complaintRepository: IComplaintRepository,

    @inject('ComplaintPhotoRepository')
    private complaintPhotoRepository: IComplaintPhotoRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    description,
    positionLat,
    positionLng,
    requesterId,
    postId,
    arrayPhotos,
  }: ICreateComplaintServiceDto): Promise<Complaint> {
    const complaint = await this.complaintRepository.create({
      description,
      positionLat,
      positionLng,
      requesterId,
      postId,
      photos: [],
    });

    await Promise.all(
      arrayPhotos.map(async item => {
        const photoFilename = await this.storageProvider.saveFile(item);

        const complaintPhoto = await this.complaintPhotoRepository.create({
          complaintId: complaint.id,
          photoFilename,
        });

        complaint.photos.push(complaintPhoto);
      }),
    );

    return complaint;
  }
}
