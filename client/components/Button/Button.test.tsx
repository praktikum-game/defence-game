import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('render with default props', () => {
    expect.assertions(1);

    const { getByRole } = render(<Button />);
    expect(getByRole('button')).toHaveTextContent('Button');
  });
  it('render with different texts', () => {
    expect.assertions(2);

    const { getByText: getByTextButtonTest } = render(<Button text="Test" />);
    expect(() => getByTextButtonTest('Test')).not.toThrow();

    const { getByText: getByTextButtonTest1 } = render(<Button text="Test_1" />);
    expect(() => getByTextButtonTest1('Test_1')).not.toThrow();
  });

  it('render if disabled', () => {
    expect.assertions(1);

    const { getByRole } = render(<Button disabled text="Test" />);
    expect(getByRole('button')).toBeDisabled();
  });

  it('render if loading', () => {
    expect.assertions(1);

    const { getByRole } = render(<Button loading />);
    expect(getByRole('button')).toHaveTextContent('Загрузка...');
  });

  it('render if clicked', () => {
    expect.assertions(1);
    const mockFn = jest.fn();

    const { getByText } = render(<Button onClick={mockFn} text="Test" />);

    fireEvent.click(getByText('Test'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
