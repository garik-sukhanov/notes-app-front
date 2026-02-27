# Testing Specification

## Tech Stack
- **Runner**: Vitest
- **Environment**: jsdom
- **Utilities**: React Testing Library, jest-dom
- **Coverage**: v8

## Coverage Requirements
- **Threshold**: 90% for lines, functions, branches, statements.
- **Failures**: CI/CD pipeline should fail if coverage drops below 90%.

## Best Practices

### 1. Arrange-Act-Assert
Structure tests clearly:
```tsx
test('should do something', () => {
  // Arrange
  const user = userEvent.setup();
  render(<Component />);
  
  // Act
  await user.click(screen.getByRole('button'));
  
  // Assert
  expect(screen.getByText('Result')).toBeInTheDocument();
});
```

### 2. Testing Principles
- **Test Implementation Details**: No. Test behavior.
- **Select Elements**: Use `getByRole`, `getByLabelText`, `getByPlaceholderText` (accessibility-first). Avoid `getByTestId` unless necessary.
- **Mocking**: Mock external boundaries (API calls, key third-party libraries). Do not mock internal implementation logic if possible.

### 3. Folder Structure
- Co-locate tests with components: `component.tsx` -> `component.test.tsx`.

## Commands
- `npm run test`: Run all tests.
- `npm run test:watch`: Run tests in watch mode.
- `npm run test:coverage`: Run tests and generate coverage report.
