import { ICreateComplaintDto } from '../dtos/ICreateComplaintDto';
import { IFindAllComplaintFilterDto } from '../dtos/IFindAllComplaintFilterDto';
import { Complaint } from '../infra/typeorm/entities/Complaint';

export interface IComplaintRepository {
  create(data: ICreateComplaintDto): Promise<Complaint>;
  findById(id: string): Promise<Complaint | undefined>;
  save(data: Complaint): Promise<Complaint>;
  findAll(data: IFindAllComplaintFilterDto): Promise<[Complaint[], number]>;
}
