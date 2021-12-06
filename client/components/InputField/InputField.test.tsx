import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField', () => {
  it('render with different labels', () => {
    expect.assertions(2);

    const { getByText: getByTextInputTest } = render(<InputField label="Test" />);
    expect(() => getByTextInputTest('Test')).not.toThrow();

    const { getByText: getByTextInputTest1 } = render(<InputField label="Test_1" />);
    expect(() => getByTextInputTest1('Test_1')).not.toThrow();
  });

  it('render error text', () => {
    expect.assertions(1);

    const { getByText } = render(<InputField errorText="Test_error" isValid={false} />);
    expect(() => getByText('Test_error')).not.toThrow();
  });

  it('render when disabled', () => {
    expect.assertions(1);

    const { getByRole } = render(<InputField disabled />);
    expect(getByRole('textbox')).toBeDisabled();
  });

  it('render when input changed', () => {
    expect.assertions(1);
    const mockFn = jest.fn();

    const { getByRole } = render(<InputField valueChangeCallback={mockFn} />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'Test_2' } });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('render with different input types', () => {
    expect.assertions(2);

    const { getByRole: getByRoleTextbox } = render(<InputField type="text" />);
    expect(getByRoleTextbox('textbox')).toHaveTextContent('');

    const { getByRole: getByRoleRadio } = render(<InputField type="radio" />);
    expect(getByRoleRadio('radio')).toBeVisible();
  });
});
