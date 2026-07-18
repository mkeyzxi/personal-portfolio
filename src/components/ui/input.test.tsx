import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input.className).toContain('border-input');
  });

  it('handles user props', () => {
    render(<Input disabled type="email" data-testid="email-input" />);
    const input = screen.getByTestId('email-input');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('type', 'email');
  });
});
