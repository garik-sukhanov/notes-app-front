import { vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useLoginMutation } from '@/shared/hooks';
import { renderWithThemeAndRouter } from '@/shared/helpers';
import { useSession } from '@/shared/model/session';

import { Component as LoginPage } from './login.page';

// Mock dependencies
vi.mock('@/shared/api/instance', () => ({
  instance: { post: vi.fn() },
}));

vi.mock('@/shared/model/session', () => ({
  useSession: vi.fn(),
}));

vi.mock('@/shared/hooks', () => ({
  useLoginMutation: vi.fn(),
}));

describe('LoginPage', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSession as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: mockLogin,
    });
  });

  it('renders login form correctly', () => {
    (useLoginMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: vi.fn(),
    });

    render(renderWithThemeAndRouter(<LoginPage />));

    expect(screen.getByText(/вход в аккаунт/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^войти$/i }),
    ).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    (useLoginMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: vi.fn(),
    });
    const user = userEvent.setup();
    render(renderWithThemeAndRouter(<LoginPage />));

    const submitBtn = screen.getByRole('button', { name: /^войти$/i });
    await user.click(submitBtn);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.click(submitBtn);

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument();
  });

  it('submits form', async () => {
    const user = userEvent.setup();
    const mutateMock = vi.fn();

    (useLoginMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mutateMock,
    });

    render(renderWithThemeAndRouter(<LoginPage />));

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/пароль/i);
    const submitBtn = screen.getByRole('button', { name: /^войти$/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
