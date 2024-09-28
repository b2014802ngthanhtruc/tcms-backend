import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  async setKey(key: string, value: any) {
    await this._cacheManager.set(key, value);
  }

  async getKey(key: string): Promise<any> {
    const data = await this._cacheManager.get(key);
    return data;
  }

  async delKey(key: string) {
    await this._cacheManager.del(key);
  }

  async deleteKeyFolder(pattern: string) {
    try {
      const keys = await this._cacheManager.store.keys(pattern);
      if (keys.length) {
        keys.forEach(async (key) => {
          await this.delKey(key);
        });
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      throw new BadRequestException('error');
    }
  }

  async delAll() {
    await this._cacheManager.reset();
  }
}
