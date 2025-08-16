import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    render(<InputField label="Test Input" onChange={handleChange} />);
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays error message when invalid', () => {
    render(<InputField label="Test Input" invalid errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('displays helper text', () => {
    render(<InputField label="Test Input" helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<InputField label="Test Input" disabled />);
    expect(screen.getByLabelText('Test Input')).toBeDisabled();
  });

  test('shows clear button when showClearButton is true and has value', () => {
    render(<InputField label="Test Input" value="test" showClearButton />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  test('clears input when clear button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Test Input"
        value="test"
        showClearButton
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '' } })
    );
  });
});