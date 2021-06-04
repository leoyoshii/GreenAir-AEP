import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableComplaintPhotos1622777711129
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'complaints_photos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'complaint_id',
            type: 'uuid',
          },
          {
            name: 'photo',
            type: 'varchar',
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
            name: 'complaintPhotoComplaintId',
            referencedTableName: 'complaints',
            referencedColumnNames: ['id'],
            columnNames: ['complaint_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('complaints_photos');
  }
}
