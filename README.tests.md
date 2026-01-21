# Testing Guide

This project uses **Vitest** with **React Testing Library** for testing.

## Running Tests

```bash
# Run tests in watch mode (interactive)
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- Test files should be named `*.test.tsx` or `*.test.ts`
- Tests are located alongside their source files in the `src/` directory
- Setup file: `src/test/setup.ts`

## Configuration Files

- **vitest.config.ts** - Vitest configuration
- **src/test/setup.ts** - Test setup with jest-dom matchers

## Example Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

## Available Matchers

Thanks to `@testing-library/jest-dom`, you have access to custom matchers like:

- `toBeInTheDocument()`
- `toHaveAttribute()`
- `toHaveClass()`
- `toHaveTextContent()`
- `toBeVisible()`
- And many more...

## Coverage

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.

The configuration excludes test files themselves from coverage metrics.
