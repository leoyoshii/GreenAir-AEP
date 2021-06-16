import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';
import { CreateSuggestionService } from '@modules/Suggestion/services/CreateSuggestionService';
import { UpdateStatusSuggestionService } from '@modules/Suggestion/services/UpdateStatusSuggestionService';
import { ListAllSuggestionService } from '@modules/Suggestion/services/ListAllSuggestionService';
import { CreatePostService } from '@modules/Post/services/CreatePostService';

export class SuggestionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      description,
      positionLat,
      positionLng,
      postText,
      postTitle,
      hasPost,
    } = request.body;
    const arrayPhotos = request.files as Express.Multer.File[];

    if (hasPost) {
      const createPostContainer = container.resolve(CreatePostService);

      await createPostContainer
        .execute({
          ownerId: id,
          arrayPhotos: arrayPhotos.map(item => item.filename),
          text: postText,
          title: postTitle,
        })

        .then(async post => {
          const createSuggestionContainer = container.resolve(
            CreateSuggestionService,
          );

          const complaint = await createSuggestionContainer.execute({
            description,
            positionLat,
            positionLng,
            requesterId: id,
            postId: post.id,
            arrayPhotos: [],
          });

          return response
            .status(201)
            .json({ complaint: classToPlain(complaint), post });
        });
    } else {
      const createSuggestionContainer = container.resolve(
        CreateSuggestionService,
      );

      const complaint = await createSuggestionContainer.execute({
        description,
        positionLat,
        positionLng,
        requesterId: id,
        arrayPhotos: arrayPhotos.map(item => item.filename),
      });

      return response.status(201).json({ complaint: classToPlain(complaint) });
    }
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { suggestionId } = request.params;
    const { status, statusReason } = request.body;

    const updateStatusSuggestionContainer = container.resolve(
      UpdateStatusSuggestionService,
    );

    const suggestion = await updateStatusSuggestionContainer.execute({
      suggestionId,
      status,
      statusReason,
    });

    return response.status(201).json({ suggestion: classToPlain(suggestion) });
  }

  public async listMy(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { page, pageSize } = request.query;
    const listAllSuggestionContainer = container.resolve(
      ListAllSuggestionService,
    );
    const [suggestions, total] = await listAllSuggestionContainer.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      userId: id,
    });

    return response
      .status(200)
      .json({ suggestions: classToPlain(suggestions), total });
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page, pageSize } = request.query;
    const listAllSuggestionContainer = container.resolve(
      ListAllSuggestionService,
    );
    const [suggestions, total] = await listAllSuggestionContainer.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return response
      .status(200)
      .json({ suggestions: classToPlain(suggestions), total });
  }
}
