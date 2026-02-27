import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { ProtectedRoute } from './protected-route';
import { useSession } from '@/shared/model/session';

// Mock useSession
vi.mock('@/shared/model/session', () => ({
    useSession: vi.fn(),
}));

describe('ProtectedRoute', () => {
    it('redirects to login if not authenticated', () => {
        (useSession as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ session: null });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/protected" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('renders outlet if authenticated', () => {
        (useSession as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ session: { userId: '1' } });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/protected" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
