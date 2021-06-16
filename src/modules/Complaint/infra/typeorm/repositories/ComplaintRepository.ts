import { getRepository, Repository } from 'typeorm';
import { IComplaintRepository } from '@modules/Complaint/interfaces/IComplaintRepository';
import { Complaint } from '../entities/Complaint';
import { ICreateComplaintDto } from '@modules/Complaint/dtos/ICreateComplaintDto';
import { IFindAllComplaintFilterDto } from '@modules/Complaint/dtos/IFindAllComplaintFilterDto';
import { EnumStatusComplaint } from '@modules/Complaint/interfaces/EnumStatusComplaint';

export class ComplaintRepository implements IComplaintRepository {
  private ormRepository: Repository<Complaint>;

  constructor() {
    this.ormRepository = getRepository(Complaint);
  }
  public async create({
    description,
    positionLat,
    positionLng,
    requesterId,
    photos,
  }: ICreateComplaintDto): Promise<Complaint> {
    const complaint = this.ormRepository.create({
      description,
      positionLat,
      positionLng,
      requesterId,
      photos,
      status: EnumStatusComplaint.PENDING,
    });
    return this.ormRepository.save(complaint);
  }
  public async findById(id: string): Promise<Complaint | undefined> {
    const complaint = this.ormRepository.findOne({
      where: { id },
    });

    return complaint;
  }
  public async save(data: Complaint): Promise<Complaint> {
    return this.ormRepository.save(data);
  }

  public async findAll({
    page,
    pageSize,
    userId,
  }: IFindAllComplaintFilterDto): Promise<[Complaint[], number]> {
    const [complaints, total] = await this.ormRepository.findAndCount({
      where: {
        ...(userId ? { requesterId: userId } : {}),
      },
      skip: page * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return [complaints, total];
  }
}
