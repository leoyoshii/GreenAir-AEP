import { getRepository, Repository } from 'typeorm';
import { IFriendshipRepository } from '@modules/User/interfaces/IFriendshipRepository';
import { ICreateFriendDTO } from '@modules/User/dtos/ICreateFriendDTO';
import { Friendship } from '../entities/Friendship';
import { EnumStatusFriendship } from '@modules/User/interfaces/EnumStatusFriendship';
import {
  EnumFindType,
  IFindAllFriendshipFilterDto,
} from '@modules/User/dtos/IFindAllFriendshipFilterDto';

export class FriendshipRepository implements IFriendshipRepository {
  private ormRepository: Repository<Friendship>;

  constructor() {
    this.ormRepository = getRepository(Friendship);
  }

  public async findById(id: string): Promise<Friendship | undefined> {
    const friendship = await this.ormRepository.findOne({
      where: { id },
    });

    return friendship;
  }

  public async findAll({
    page,
    pageSize,
    userId,
    findType,
    status,
    order,
    orderName,
  }: IFindAllFriendshipFilterDto): Promise<[Friendship[], number]> {
    const query = await this.ormRepository.createQueryBuilder('friendship');

    if (status) {
      query.andWhere('friendship.status =:status', { status });
    }

    if (findType === EnumFindType.ALL) {
      query.andWhere('friendship.requesterId =:userId', { userId });
      query.orWhere('friendship.requestedId =:userId', { userId });
    } else if (findType === EnumFindType.REQUESTED) {
      query.andWhere('friendship.requestedId =:userId', { userId });
    } else if (findType === EnumFindType.REQUESTER) {
      query.andWhere('friendship.requesterId =:userId', { userId });
    }

    if (order && orderName) {
      query.orderBy(`'friendship.${orderName}': '${order}'`);
    } else {
      query.orderBy({
        'friendship.createdAt': 'ASC',
      });
    }

    query.skip(page * pageSize);
    query.take(pageSize);

    const [friendships, total] = await query.getManyAndCount();

    return [friendships, total];
  }

  public async checkExist({
    requesterId,
    requestedId,
  }: ICheckExistsFriendshipFilterDto): Promise<Friendship | undefined> {
    const query = await this.ormRepository.createQueryBuilder('friendship');

    query.andWhere(
      'friendship.requesterId =:requesterId AND friendship.requestedId =:requestedId ',
      { requesterId, requestedId },
    );

    query.orWhere(
      'friendship.requesterId =:requestedId AND friendship.requestedId =:requesterId',
      { requesterId, requestedId },
    );

    const friendship = await query.getOne();

    return friendship;
  }

  public async create(data: ICreateFriendDTO): Promise<Friendship> {
    const { requestedId, requesterId } = data;

    const friend = await this.ormRepository.create({
      requestedId,
      requesterId,
      status: EnumStatusFriendship.PENDING,
    });

    return this.ormRepository.save(friend);
  }

  public async save(user: Friendship): Promise<Friendship> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
