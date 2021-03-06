import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableComplaint1622777034023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'complaints',
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
            name: 'position_lat',
            type: 'decimal',
            precision: 11,
            scale: 8,
          },
          {
            name: 'position_lng',
            type: 'decimal',
            precision: 11,
            scale: 8,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'DECLINED', 'INPROGRESS', 'CONCLUDED'],
            enumName: 'EnumStatusComplaint',
          },
          {
            name: 'status_reason',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'post_id',
            type: 'uuid',
            isNullable: true,
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
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'complaintUserId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['requester_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'complaintPostId',
            referencedTableName: 'posts',
            referencedColumnNames: ['id'],
            columnNames: ['post_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('complaints');
  }
}
