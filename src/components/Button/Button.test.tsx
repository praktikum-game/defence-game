import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('test Button component', () => {
  it('render with default props', () => {
    expect.assertions(1);

    render(<Button />);
    expect(screen.getByText('Button')).toHaveTextContent('Button');
  });
  it('render with different texts', () => {
    expect.assertions(2);

    render(<Button text="Test" />);
    expect(screen.getByText('Test')).toHaveTextContent('Test');

    render(<Button text="Test_1" />);
    expect(screen.getByText('Test_1')).toHaveTextContent('Test_1');
  });

  it('if disabled', () => {
    expect.assertions(1);

    render(<Button disabled text="Test" />);
    expect(screen.getByText('Test')).toBeDisabled();
  });

  it('if loading', () => {
    expect.assertions(1);

    render(<Button loading />);
    expect(screen.getByText('Загрузка...')).toHaveTextContent('Загрузка...');
  });

  it('if clicked', () => {
    expect.assertions(1);
    const mockFn = jest.fn();

    render(<Button onClick={mockFn} text="Test" />);

    fireEvent.click(screen.getByText('Test'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
