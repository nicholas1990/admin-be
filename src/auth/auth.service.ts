import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

    const payload = {
      id: _user.id,
      email: _user.email,
      firstName: _user.firstName,
      lastName: _user.lastName,
      role: _user.role,
      isActive: _user.isActive,
    };
    console.log('payload:', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
