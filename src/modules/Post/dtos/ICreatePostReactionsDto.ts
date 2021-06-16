export interface ICreatePostReactionsDto {
  postId: string;
  userId: string;
  like: boolean;
  favorite: boolean;
  comment: string;
}
