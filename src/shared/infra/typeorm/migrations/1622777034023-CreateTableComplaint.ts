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
            name: 'requesterId',
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
          },
        ],
        foreignKeys: [
          {
            name: 'complaintUserId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['requesterId'],
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
