import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  afterEach(cleanup);
  it('def textarea', () => {
    expect.assertions(2);
    const handleChange = jest.fn();
    const handleSelect = jest.fn();
    const { getByRole } = render(
      <TextArea
        value={'Initial value'}
        onChange={handleChange}
        onSelect={handleSelect}
        name="area"
      />,
    );
    expect(getByRole('textbox')).toHaveTextContent('Initial value');

    fireEvent.change(getByRole('textbox'), { target: { value: 'Changed Text' } });

    expect(getByRole('textbox')).toHaveTextContent('Changed Text');
  });
});
