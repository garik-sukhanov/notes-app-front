import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/shared/helpers';
import { Input } from '.';

describe('Input', () => {
    it('renders correctly', () => {
        render(renderWithTheme(<Input placeholder="Enter text" />));
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('accepts user input', async () => {
        const user = userEvent.setup();
        render(renderWithTheme(<Input placeholder="Type here" />));
        const input = screen.getByPlaceholderText('Type here');
        await user.type(input, 'Hello');
        expect(input).toHaveValue('Hello');
    });

    it('passes other props', () => {
        render(renderWithTheme(<Input data-testid="test-input" disabled />));
        const input = screen.getByTestId('test-input');
        expect(input).toBeDisabled();
    });

    it('renders with error styling when $error is true', () => {
        render(renderWithTheme(<Input data-testid="error-input" $error />));
        expect(screen.getByTestId('error-input')).toBeInTheDocument();
    });
});
