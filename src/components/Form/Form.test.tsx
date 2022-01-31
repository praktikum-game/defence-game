/* eslint-disable no-console */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('render with children', () => {
    expect.assertions(1);
    const { getByText } = render(
      <Form onFormSubmit={() => console.log('submit')}>
        <p>Test text</p>
      </Form>,
    );
    expect(() => getByText('Test text')).not.toThrow();
  });

  it('work with invalid data', () => {
    expect.assertions(1);
    const handleFormSubmitNotCall = jest.fn();
    const handleFormSubmit = jest.fn();

    const { getByText } = render(
      <Form onFormSubmit={handleFormSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );
    fireEvent.click(getByText('Submit'));

    expect(handleFormSubmitNotCall).toHaveBeenCalledTimes(0);
  });

  it('called callback', async () => {
    expect.assertions(1);
    const handleFormSubmit = jest.fn();

    const { getByText } = render(
      <Form onFormSubmit={handleFormSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );
    fireEvent.click(getByText('Submit'));

    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });
});
