import { EnumStatusFriendship } from '../interfaces/EnumStatusFriendship';

export interface IFindAllFriendshipFilterDto {
  page: number;
  pageSize: number;
  userId: string;
  findType: EnumFindFriendshipType;
  status?: EnumStatusFriendship;
  orderName?: string;
  order?: string;
}

export enum EnumFindFriendshipType {
  ALL = 'ALL',
  REQUESTER = 'REQUESTER',
  REQUESTED = 'REQUESTED',
}
