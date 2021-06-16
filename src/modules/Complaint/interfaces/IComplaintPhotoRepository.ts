import { ICreateComplaintPhotoDto } from '../dtos/ICreateComplaintPhotoDto';
import { ComplaintPhoto } from '../infra/typeorm/entities/ComplaintPhoto';

export interface IComplaintPhotoRepository {
  create(data: ICreateComplaintPhotoDto): Promise<ComplaintPhoto>;
  findById(id: string): Promise<ComplaintPhoto | undefined>;
  save(data: ComplaintPhoto): Promise<ComplaintPhoto>;
}
