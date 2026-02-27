import { vi } from 'vitest';

import { instance } from '../api/instance';
import { userService } from './user.service';

vi.mock('../api/instance', () => ({
  instance: {
    get: vi.fn(),
  },
}));

describe('UserService', () => {
  it('getAll makes api call', async () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    (instance.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockUsers,
    });

    const users = await userService.getAll();

    expect(instance.get).toHaveBeenCalledWith('/users');
    expect(users.data).toBe(mockUsers);
  });
});
