import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  /**
   * Create an hash from plaintext password string
   *
   * @param password: plaintext password
   * @returns: password hash
   */
  async getPasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Verify if Password is correct
   *
   * @param password: plaintext password
   * @param hash: password hash
   * @returns: boolean
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
