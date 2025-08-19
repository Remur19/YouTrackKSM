import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textfield from './Textfield';

describe('Textfield', () => {
  test('allows typing and clearing the input', async () => {
    const handleChange = jest.fn();
    render(
      <Textfield
        type="text"
        placeholder="Enter text"
        value="hello"
        onChange={handleChange}
      />
    );

    // Input is rendered
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();

    // Clear button is visible because value is non-empty
    const clearButton = screen.getByRole('button', { name: /x/i });
    expect(clearButton).toBeInTheDocument();

    // Type into the input
    await userEvent.type(input, ' world');
    expect(handleChange).toHaveBeenCalled(); // Called for each character

    // Click the clear button
    await userEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith(''); // Clears value
  });

  test('clearing twice', async () => {
    const handleChange = jest.fn();
    render(
      <Textfield
        type="text"
        placeholder="Enter text"
        value="hello"
        onChange={handleChange}
      />
    );

    // Input is rendered
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();

    // Clear button is visible because value is non-empty
    const clearButton = screen.getByRole('button', { name: /x/i });
    expect(clearButton).toBeInTheDocument();

    // Type into the input
    await userEvent.type(input, ' world');
    expect(handleChange).toHaveBeenCalled(); // Called for each character

    // Click the clear button
    await userEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith(''); // Clears value

    // Click the clear button
    await userEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith(''); // Clears value
  });
});
