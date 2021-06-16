import { getRepository, Repository } from 'typeorm';
import { IComplaintRepository } from '@modules/Complaint/interfaces/IComplaintRepository';
import { Complaint } from '../entities/Complaint';
import { ICreateComplaintDto } from '@modules/Complaint/dtos/ICreateComplaintDto';
import { IFindAllComplaintFilterDto } from '@modules/Complaint/dtos/IFindAllComplaintFilterDto';

export class PostRepository implements IComplaintRepository {
  private ormRepository: Repository<Complaint>;

  constructor() {
    this.ormRepository = getRepository(Complaint);
  }
  public async create(data: ICreateComplaintDto): Promise<Complaint> {
    throw new Error('Method not implemented.');
  }
  public async findById(id: string): Promise<Complaint | undefined> {
    throw new Error('Method not implemented.');
  }
  public async save(data: Complaint): Promise<Complaint> {
    throw new Error('Method not implemented.');
  }
  public async findAll(
    data: IFindAllComplaintFilterDto,
  ): Promise<[Complaint[], number]> {
    throw new Error('Method not implemented.');
  }
  public async findMy(userid: string): Promise<[Complaint[], number]> {
    throw new Error('Method not implemented.');
  }
}
