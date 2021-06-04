import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableFriendship1622775928404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'friendship',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'requester_id',
            type: 'uuid',
          },
          {
            name: 'requested_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'ACCEPTED', 'DECLINED', 'BLOQUED'],
            enumName: 'EnumStatusFriendship',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'userFriendshipRequesterId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['requester_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'userFriendshipRequestedId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['requested_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('friendship');
  }
}
