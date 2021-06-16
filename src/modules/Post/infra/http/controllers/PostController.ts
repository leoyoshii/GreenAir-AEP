import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';
import { CreatePostService } from '@modules/Post/services/CreatePostService';
import { ListAllPostService } from '@modules/Post/services/ListAllPostService';
import { EnumFindPostType } from '@modules/Post/dtos/IFindAllPostFilterDto';
import { GetAllFriendsService } from '@modules/User/services/GetAllFriendsService';
import { CreateAReactionService } from '@modules/Post/services/CreateAReactionService';
import { UpdatePostService } from '@modules/Post/services/UpdatePostService';

export class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { text, title } = request.body;
    const arrayPhotos = request.files as Express.Multer.File[];

    const createPostContainer = container.resolve(CreatePostService);

    const post = await createPostContainer.execute({
      ownerId: id,
      photos: arrayPhotos.map(item => item.filename),
      text,
      title,
    });

    return response.status(201).json({ post: classToPlain(post) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;
    const { text, title } = request.body;
    const arrayPhotos = request.files as Express.Multer.File[];

    const updatePostContainer = container.resolve(UpdatePostService);

    const post = await updatePostContainer.execute({
      postId,
      photos: arrayPhotos.map(item => item.filename),
      text,
      title,
    });

    return response.status(200).json({ post: classToPlain(post) });
  }
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { findType, page, pageSize, order, orderName } = request.query;

    let ownersIds: string[] = [];

    if (findType === EnumFindPostType.ONLYFRIENDS) {
      const getAllFriendsContainer = container.resolve(GetAllFriendsService);

      const friends = await getAllFriendsContainer.execute(id);

      friends.map(item => {
        ownersIds.push(item.id);
      });
    }

    const enumType: EnumFindPostType = (<any>EnumFindPostType)[
      String(findType)
    ];

    const listAllPostContainer = container.resolve(ListAllPostService);
    const [posts, total] = await listAllPostContainer.execute({
      ownersIds,
      page: Number(page),
      pageSize: Number(pageSize),
      ...(order && orderName
        ? { order: String(order), orderName: String(orderName) }
        : {}),
      findType: enumType,
    });

    return response.status(200).json({ posts: classToPlain(posts), total });
  }

  public async createAReaction(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { postId } = request.params;
    const { comment, favorite, like } = request.body;

    const createPostContainer = container.resolve(CreateAReactionService);

    const reaction = await createPostContainer.execute({
      comment,
      favorite,
      like,
      postId,
      userId: id,
    });

    return response.status(201).json({ reaction });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;

    const deletePostContainer = container.resolve(DeletePostService);

    await deletePostContainer.execute(postId);

    return response.status(204).json({ message: 'Post deleted successfully' });
  }
}
