import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '@/shared/helpers';
import { Button } from '.';

describe('Button', () => {
    it('renders children correctly', () => {
        render(renderWithTheme(<Button>Click me</Button>));
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('supports variants without crashing', () => {
        render(renderWithTheme(<Button $variant="secondary">Secondary</Button>));
        expect(screen.getByRole('button', { name: /secondary/i })).toBeInTheDocument();
    });

    it('supports custom class names', () => {
        render(renderWithTheme(<Button className="custom-class">Test</Button>));
        const button = screen.getByRole('button', { name: /test/i });
        expect(button).toHaveClass('custom-class');
    });

    it('renders disabled state correctly', () => {
        render(renderWithTheme(<Button disabled>Disabled</Button>));
        expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled();
    });
});
