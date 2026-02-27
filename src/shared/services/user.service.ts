import { instance } from '../api/instance';
import type { GetUsersResponseDto } from '../types/dto';

class UserService {
  private _USERS = '/users';

  async getAll() {
    return await instance.get<GetUsersResponseDto>(this._USERS);
  }
}

export const userService = new UserService();
