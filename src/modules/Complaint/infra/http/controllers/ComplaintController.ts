import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';
import { CreateComplaintService } from '@modules/Complaint/services/CreateComplaintService';
import { ListAllComplaintService } from '@modules/Complaint/services/ListAllComplaintService';
import { UpdateStatusComplaintService } from '@modules/Complaint/services/UpdateStatusComplaintService';

export class ComplaintController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { description, positionLat, positionLng } = request.body;
    const arrayPhotos = request.files as Express.Multer.File[];

    const createComplaintContainer = container.resolve(CreateComplaintService);

    const complaint = await createComplaintContainer.execute({
      description,
      positionLat,
      positionLng,
      requesterId: id,
      arrayPhotos: arrayPhotos.map(item => item.filename),
    });

    return response.status(201).json({ complaint: classToPlain(complaint) });
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { complaintId } = request.params;
    const { status, statusReason } = request.body;

    const updateStatusComplaintContainer = container.resolve(
      UpdateStatusComplaintService,
    );

    const complaint = await updateStatusComplaintContainer.execute({
      complaintId,
      status,
      statusReason,
    });

    return response.status(201).json({ complaint: classToPlain(complaint) });
  }

  public async listMy(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { page, pageSize } = request.query;
    const listAllComplaintContainer = container.resolve(
      ListAllComplaintService,
    );
    const [complaints, total] = await listAllComplaintContainer.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      userId: id,
    });

    return response
      .status(200)
      .json({ complaints: classToPlain(complaints), total });
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page, pageSize } = request.query;
    const listAllComplaintContainer = container.resolve(
      ListAllComplaintService,
    );
    const [complaints, total] = await listAllComplaintContainer.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return response
      .status(200)
      .json({ complaints: classToPlain(complaints), total });
  }
}
