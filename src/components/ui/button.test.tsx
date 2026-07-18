import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
  });

  it('renders with different variants', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button.className).toContain('bg-destructive/10');
  });

  it('passes extra props to the button element', () => {
    render(<Button disabled data-testid="custom-btn">Disabled</Button>);
    const button = screen.getByTestId('custom-btn');
    expect(button).toBeDisabled();
  });
});
