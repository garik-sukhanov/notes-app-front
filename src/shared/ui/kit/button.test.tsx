import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('passes props to ant design button', () => {
        render(<Button loading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('supports custom class names', () => {
        render(<Button className="custom-class">Test</Button>);
        const button = screen.getByRole('button', { name: /test/i });
        expect(button).toHaveClass('custom-class');
    });
});
