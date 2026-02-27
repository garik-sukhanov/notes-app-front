import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useSession } from '@/shared/model/session';

vi.mock('@/shared/model/session', () => ({
    useSession: vi.fn(),
}));

vi.mock('@/shared/hooks', () => ({
    useRegisterMutation: vi.fn(),
}));

import { Component as RegisterPage } from './register.page';
import { useRegisterMutation } from '@/shared/hooks';

describe('RegisterPage', () => {
    const mockLogin = vi.fn();
    const mockMutate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useSession as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            login: mockLogin,
        });
        (useRegisterMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            mutate: mockMutate,
        });
    });

    it('renders register form correctly', () => {
        render(<RegisterPage />);

        expect(screen.getByText(/регистрация/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^пароль$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/подтвердите пароль/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
    });

    it('submits form and logs in on success', async () => {
        const user = userEvent.setup();

        render(<RegisterPage />);

        const emailInput = screen.getByLabelText(/^email$/i);
        const passwordInput = screen.getByLabelText(/^пароль$/i);
        const confirmInput = screen.getByLabelText(/подтвердите пароль/i);
        const submitBtn = screen.getByRole('button', { name: /зарегистрироваться/i });

        await user.type(emailInput, 'newuser@example.com');
        await user.type(passwordInput, 'secret123');
        await user.type(confirmInput, 'secret123');
        await user.click(submitBtn);

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith({
                email: 'newuser@example.com',
                password: 'secret123',
            });
        });
    });

    it('validates passwords match', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        const emailInput = screen.getByLabelText(/^email$/i);
        const passwordInput = screen.getByLabelText(/^пароль$/i);
        const confirmInput = screen.getByLabelText(/подтвердите пароль/i);
        const submitBtn = screen.getByRole('button', { name: /зарегистрироваться/i });

        // Fill in the form with mismatched passwords
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.type(confirmInput, 'differentPassword');
        await user.click(submitBtn);

        // Check that the error message appears
        await waitFor(() => {
            expect(screen.getByText(/пароли не совпадают!/i)).toBeInTheDocument();
        });

        // Verify that the mutation was not called
        expect(mockMutate).not.toHaveBeenCalled();
    });
});
