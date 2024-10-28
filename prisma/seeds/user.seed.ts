import * as fs from 'fs';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

export class UserSeed {
  static key = 'user-seed-key';
  constructor(private readonly _prisma: PrismaClient) {}

  private async _hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async _loadFile(filePath: string) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const userData = JSON.parse(data);
      return userData;
    } catch (error) {
      console.error('Error reading users file:', error);
      throw error;
    }
  }

  async run() {
    const userData = await this._loadFile(__dirname + '/../data/user.json');
    for (const user of userData) {
      const hashedPassword = await this._hashPassword(user.password);
      await this._prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    }
  }
}
