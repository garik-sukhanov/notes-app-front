import { render, screen } from '@testing-library/react';
import { Providers } from './providers';

describe('Providers', () => {
    it('renders children with query client and router', () => {
        render(
            <Providers>
                <div data-testid="child">Child</div>
            </Providers>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
