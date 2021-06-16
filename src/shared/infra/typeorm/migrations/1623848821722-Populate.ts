import { MigrationInterface, QueryRunner } from 'typeorm';

export class Populate1623848821722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (id, name,email,password,city,state,biografy,phone,area_code_phone,avatar,gender,other_gender,role,created_at,updated_at,deleted_at) VALUES
      ('5cae70e1-3b52-4ab6-8cb1-f6a4a18c9b3a', 'Leonardo Yoshii','leoyoshii@greenair.com','$2a$08$SMVolP1.zLsIyz4t593WKegrOEpwP8fyFsYlCEcxNKxZuNluYQuK2',null,null,null,null,null,null,'MALE',null,'API_MASTER','now()','now()',null),
      ('a08d71b0-6449-45b6-8123-43f4c7b4a80a', 'Guilherme Ciesco','guilhermeciesco@greenair.com','$2a$08$MlNjABhv1WgsdCx.0oIJwOohN6Pkg5k.1MJTXo9nmV1o5cJMsW71a',null,null,null,null,null,null,'MALE',null,'API_ADMIN','now()','now()',null),
      ('ea9d32bb-86ac-47e5-b815-75dc4f86831c', 'Leonardo Lanjoni','leonardolanjoni@greenair.com','$2a$08$0Gk6nOt92cLyoewE5xxIieSwv45EMW9ZQfr5xMzNdf2v8TpybDHLK',null,null,null,null,null,null,'MALE',null,'API_COMMON','now()','now()',null),
      ('b07c34b6-2b8b-45c1-a2b8-4c50525b7e1b', 'Gustavo Cesar','gustavocesar@greenair.com','$2a$08$mVyCJ8/T81DxaBcMpGLWVe.ERn1.V4Yol2SLgAVX.mfgHFFHGjTGC',null,null,null,null,null,null,'MALE',null,'API_ADMIN','now()','now()',null),
      ('f45faf11-3c12-453a-8c57-dba4bcc78533', 'Guilherme Laverde','guilhermelaverde@greenair.com','$2a$08$KHo7jztP8QHtgJ9s6tGT7.s6UwORHGmnwxPq9aXA9oDKHn8dS6aEC',null,null,null,null,null,null,'MALE',null,'API_COMMON','now()','now()',null)`,
    );
    await queryRunner.query(
      `INSERT INTO friendship (id, requester_id,requested_id,status,created_at,updated_at,deleted_at) VALUES
       ('768b0d61-a987-4c23-9aea-81e96f7c7b29', 'f45faf11-3c12-453a-8c57-dba4bcc78533','b07c34b6-2b8b-45c1-a2b8-4c50525b7e1b','ACCEPTED','now()','now()',null),
       ('9ac7c467-0e0e-4042-ab28-90f632cd080d', 'f45faf11-3c12-453a-8c57-dba4bcc78533','ea9d32bb-86ac-47e5-b815-75dc4f86831c','PENDING','now()','now()',null),
       ('768b0d61-a987-4c23-ab28-90f632cd080d', 'b07c34b6-2b8b-45c1-a2b8-4c50525b7e1b','ea9d32bb-86ac-47e5-b815-75dc4f86831c','PENDING','now()','now()',null)`,
    );
    await queryRunner.query(
      `INSERT INTO posts (id, owner_id,title,text,created_at,updated_at,deleted_at) VALUES
      ('25491519-eafe-4152-968c-3753db32be43', 'f45faf11-3c12-453a-8c57-dba4bcc78533','Legal','Sugestão','now()','now()',null),
      ('92df1951-8fbf-4d3c-8df0-247fca81b384', 'ea9d32bb-86ac-47e5-b815-75dc4f86831c','Absurdo','Denuncia','now()','now()',null),
      ('9e22d880-48e8-4b3f-ac85-b9cd5eac9c89', 'b07c34b6-2b8b-45c1-a2b8-4c50525b7e1b','teste',null,'now()','now()',null)`,
    );
    await queryRunner.query(
      `INSERT INTO posts_photos (id, post_id,photo,created_at,updated_at,deleted_at) VALUES
      ('3b07d019-a4a6-4d7a-8312-9db4edc5c03d', '92df1951-8fbf-4d3c-8df0-247fca81b384','778ac4968205ca1d68d5-006.png','now()','now()',null),
      ('57a30b27-0562-4468-b2a6-24dc64db58cd', '9e22d880-48e8-4b3f-ac85-b9cd5eac9c89','f789526718fea8886930-003.png','now()','now()',null)`,
    );
    await queryRunner.query(
      `INSERT INTO complaints (id, requester_id,position_lat,position_lng,description,status,status_reason,post_id,created_at,updated_at,deleted_at) VALUES
      ('ef472661-6126-4ec8-ae05-361608bbb7ed', 'ea9d32bb-86ac-47e5-b815-75dc4f86831c',-24.43767640,-50.91132410,'Denuncia','PENDING',null,'92df1951-8fbf-4d3c-8df0-247fca81b384','now()','now()',null)`,
    );
    await queryRunner.query(
      `INSERT INTO suggestions (id, requester_id,position_lat,position_lng,description,status,status_reason,post_id,created_at,updated_at,deleted_at) VALUES
      ('75d65a0b-ea7a-4e5c-9462-d415de12bbc7', 'f45faf11-3c12-453a-8c57-dba4bcc78533',-23.43767640,-51.91132410,'Teste','INPROGRESS','Enviado Apoio','25491519-eafe-4152-968c-3753db32be43','now()','now()',null)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE id='5cae70e1-3b52-4ab6-8cb1-f6a4a18c9b3a' OR id='a08d71b0-6449-45b6-8123-43f4c7b4a80a'  OR id='ea9d32bb-86ac-47e5-b815-75dc4f86831c'  OR id='b07c34b6-2b8b-45c1-a2b8-4c50525b7e1b' OR id='f45faf11-3c12-453a-8c57-dba4bcc78533'`,
    );
    await queryRunner.query(
      `DELETE FROM friendship WHERE id='768b0d61-a987-4c23-9aea-81e96f7c7b29' OR id='9ac7c467-0e0e-4042-ab28-90f632cd080d'  OR id='768b0d61-a987-4c23-ab28-90f632cd080d'`,
    );
    await queryRunner.query(
      `DELETE FROM posts WHERE id='25491519-eafe-4152-968c-3753db32be43' OR id='92df1951-8fbf-4d3c-8df0-247fca81b384'  OR id='9e22d880-48e8-4b3f-ac85-b9cd5eac9c89'`,
    );
    await queryRunner.query(
      `DELETE FROM posts_photos WHERE id='3b07d019-a4a6-4d7a-8312-9db4edc5c03d' OR id='57a30b27-0562-4468-b2a6-24dc64db58cd'`,
    );
    await queryRunner.query(
      `DELETE FROM complaints WHERE id='ef472661-6126-4ec8-ae05-361608bbb7ed'`,
    );
    await queryRunner.query(
      `DELETE FROM suggestions WHERE id='75d65a0b-ea7a-4e5c-9462-d415de12bbc7'`,
    );
  }
}
