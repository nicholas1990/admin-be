import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/shared/service/password.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('asdfjnjndfs', email);
    const user = await this.usersService.findOneByEmail(email);
    console.log('asdfjnjndfs', user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const _user = await this.usersService.findOneByEmail(user.email); // Verify if User exists

    if (!_user) {
      return;
    }

    const checkPassword = await this.passwordService.comparePassword(
      user.password,
      _user.password,
    );

    if (!checkPassword) {
      return;
    }

    return {
      access_token: this.jwtService.sign({
        id: _user.id,
        email: _user.email,
        name: _user.firstName,
        surname: _user.lastName,
        role: _user.role,
        isActive: _user.isActive,
      }),
    };
  }

  // async checkPassword(plainText: string, hash: string) {
  //   return await this.passwordService.comparePassword(plainText, hash);
  // }
}
