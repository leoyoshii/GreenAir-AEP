import { inject, injectable } from 'tsyringe';
import { IFindAllComplaintFilterDto } from '../dtos/IFindAllComplaintFilterDto';
import { Complaint } from '../infra/typeorm/entities/Complaint';
import { IComplaintRepository } from '../interfaces/IComplaintRepository';

@injectable()
export class ListAllComplaintService {
  constructor(
    @inject('ComplaintRepository')
    private complaintRepository: IComplaintRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    userId,
  }: IFindAllComplaintFilterDto): Promise<[Complaint[], number]> {
    const [posts, total] = await this.complaintRepository.findAll({
      page,
      pageSize,
      userId,
    });

    return [posts, total];
  }
}
