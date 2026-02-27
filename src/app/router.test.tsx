import { vi } from 'vitest';

import { router } from './router';

vi.mock('@/features/auth/login.page', () => ({
  default: () => <div>Login Page</div>,
}));
vi.mock('@/features/notes/notes.page', () => ({
  default: () => <div>Notes Page</div>,
}));

describe('Router', () => {
  it('defines routes', async () => {
    expect(router).toBeDefined();
    expect(router.routes.length).toBeGreaterThan(0);
  });
});
