import { AppErrors } from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { Complaint } from '../infra/typeorm/entities/Complaint';
import { EnumStatusComplaint } from '../interfaces/EnumStatusComplaint';
import { IComplaintRepository } from '../interfaces/IComplaintRepository';

interface IUpdateStatusComplaintDto {
  complaintId: string;
  status: EnumStatusComplaint;
  statusReason: string;
}

@injectable()
export class UpdateStatusComplaintService {
  constructor(
    @inject('ComplaintRepository')
    private complaintRepository: IComplaintRepository,
  ) {}

  public async execute({
    complaintId,
    status,
    statusReason,
  }: IUpdateStatusComplaintDto): Promise<Complaint> {
    const complaint = await this.complaintRepository.findById(complaintId);

    if (!complaint) {
      throw new AppErrors('Complaint not found', 404);
    }

    complaint.status = status;
    complaint.statusReason = statusReason;

    return this.complaintRepository.save(complaint);
  }
}
