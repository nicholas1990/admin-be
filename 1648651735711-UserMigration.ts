import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { User } from './src/users/entity/user.entity';

export class UserMigration1648651735711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'isActive',
            type: 'boolean',
          },
        ],
      }),
      true,
    );

    const userRepository = queryRunner.connection.getRepository(User);

    const user = new User();
    user.firstName = 'Nicholas';
    user.lastName = 'Angelucci';
    user.email = 'nicholas.angelucci@gmial.com';
    user.password = 'NichAngelucci';
    user.role = 'admin';

    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
