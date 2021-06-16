export interface IFindAllPostFilterDto {
  page: number;
  pageSize: number;
  findType: EnumFindPostType;
  ownersIds?: string[];
  orderName?: string;
  order?: string;
}

export enum EnumFindPostType {
  ALL = 'ALL',
  ONLYFRIENDS = 'ONLYFRIENDS',
}
