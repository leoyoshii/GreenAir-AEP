import { EnumStatusFriendship } from '../interfaces/EnumStatusFriendship';

export interface IFindAllFriendshipFilterDto {
  page: number;
  pageSize: number;
  userId: string;
  findType: EnumFindType;
  status?: EnumStatusFriendship;
  orderName?: string;
  order?: string;
}

export enum EnumFindType {
  ALL = 'ALL',
  REQUESTER = 'REQUESTER',
  REQUESTED = 'REQUESTED',
}
