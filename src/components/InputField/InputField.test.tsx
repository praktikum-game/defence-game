import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('test InputField component', () => {
  it('render with different labels', () => {
    expect.assertions(2);

    render(<InputField label="Test" />);
    expect(screen.getByText('Test')).toHaveTextContent('Test');

    render(<InputField label="Test_1" />);
    expect(screen.getByText('Test_1')).toHaveTextContent('Test_1');
  });

  it('render error text', () => {
    expect.assertions(1);

    render(<InputField errorText="Test_error" isValid={false} />);
    expect(screen.getByText('Test_error')).toHaveTextContent('Test_error');
  });

  it('when disabled', () => {
    expect.assertions(1);

    render(<InputField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('when input changed', () => {
    expect.assertions(1);
    const mockFn = jest.fn();

    render(<InputField valueChangeCallback={mockFn} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test_2' } });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('with different input types', () => {
    expect.assertions(2);

    const getByRoleTextbox = render(<InputField type="text" />).getByRole;
    expect(getByRoleTextbox('textbox')).toHaveTextContent('');

    const getByRoleRadio = render(<InputField type="radio" />).getByRole;
    expect(getByRoleRadio('radio')).toBeVisible();
  });
});
