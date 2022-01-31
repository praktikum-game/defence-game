import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField', () => {
  it('render with different labels', () => {
    expect.assertions(2);

    const { getByText: getByTextInputTest } = render(<InputField value="test_val0" label="Test" />);
    expect(() => getByTextInputTest('Test')).not.toThrow();

    const { getByText: getByTextInputTest1 } = render(
      <InputField label="Test_1" value="test_val" />,
    );
    expect(() => getByTextInputTest1('Test_1')).not.toThrow();
  });

  it('render error text', () => {
    expect.assertions(1);

    const { getByText } = render(<InputField value="text_val1" errors={['Test_error']} />);
    expect(() => getByText('Test_error')).not.toThrow();
  });

  it('render when disabled', () => {
    expect.assertions(1);

    const { getByTestId } = render(
      <InputField data-testid="inputfield" value="test_val2" disabled />,
    );
    expect(getByTestId('inputfield')).toBeDisabled();
  });

  it('render when input changed', () => {
    expect.assertions(1);
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <InputField data-testid="inputfield" value="test_val3" onTextChange={mockFn} />,
    );

    fireEvent.change(getByTestId('inputfield'), { target: { value: 'test_val' } });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('render with different input types', () => {
    expect.assertions(2);

    const { getByRole: byRole } = render(<InputField value="val" type="text" />);
    expect(byRole('textbox')).toHaveValue('val');

    const { getByRole: byRoleCheckbox } = render(<InputField value="val_other" type="checkbox" />);
    expect(byRoleCheckbox('checkbox')).toBeVisible();
  });
});
