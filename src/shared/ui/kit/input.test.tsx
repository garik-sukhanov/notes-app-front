import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '.';

describe('Input', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('accepts user input', async () => {
        const user = userEvent.setup();
        render(<Input placeholder="Type here" />);
        const input = screen.getByPlaceholderText('Type here');
        await user.type(input, 'Hello');
        expect(input).toHaveValue('Hello');
    });

    it('passes other props', () => {
        render(<Input data-testid="test-input" disabled />);
        const input = screen.getByTestId('test-input');
        expect(input).toBeDisabled();
    });
});
