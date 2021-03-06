import { ComplaintPhoto } from '../infra/typeorm/entities/ComplaintPhoto';

export interface ICreateComplaintDto {
  requesterId: string;
  positionLat: number;
  positionLng: number;
  description: string;
  postId?: string;
  photos?: ComplaintPhoto[];
}
