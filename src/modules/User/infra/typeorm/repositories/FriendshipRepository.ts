import { getRepository, Repository } from 'typeorm';
import { IFriendshipRepository } from '@modules/User/IRepositories/IFriendshipRepository';
import { ICreateFriendDTO } from '@modules/User/dtos/ICreateFriendDTO';
import { Friendship } from '../entities/Friendship';
import { EnumStatusFriendship } from '@modules/User/IRepositories/EnumStatusFriendship';

export class FriendshipRepository implements IFriendshipRepository {
  private ormRepository: Repository<Friendship>;

  constructor() {
    this.ormRepository = getRepository(Friendship);
  }

  public async findOne(id: string): Promise<Friendship | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findAll(userid: string): Promise<Friendship[]> {
    const users = await this.ormRepository.find({
      where: [{ requesterId: userid }, { requestedId: userid }],
    });

    return users;
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
}
