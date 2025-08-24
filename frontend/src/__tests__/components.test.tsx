import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textfield from '../components/Textfield';

describe('Textfield', () => {
  it('allows typing and clearing the input', async () => {
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

    // Clear button is visible cause value is not empty
    const clearButton = screen.getByRole('button', { name: /x/i });
    expect(clearButton).toBeInTheDocument();

    // Type into the input
    await userEvent.type(input, ' world');
    expect(handleChange).toHaveBeenCalled();

    // Click the clear button
    await userEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith('');
  });
});
