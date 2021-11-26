import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Form } from './Form';

describe('form', () => {
  it('render with children', () => {
    expect.assertions(1);
    const { getByText } = render(
      <Form>
        <p>Test text</p>
      </Form>,
    );
    expect(() => getByText('Test text')).not.toThrow();
  });

  describe('submit', () => {
    it('work with invalid data', () => {
      expect.assertions(1);
      const controllerCallback = jest.fn();
      const validationResults = [{ valid: false, message: '' }];
      const { getByText } = render(
        <Form controllerCallback={controllerCallback} validationResults={validationResults}>
          <button type="submit">Submit</button>
        </Form>,
      );
      fireEvent.click(getByText('Submit'));

      expect(controllerCallback).toHaveBeenCalledTimes(0);
    });

    describe('controller callback', () => {
      it('call', async () => {
        expect.assertions(1);
        const mockFn = jest.fn();
        const controllerCallback = async (data: FormData) => Promise.resolve(mockFn(data));

        const { getByText } = render(
          <Form controllerCallback={controllerCallback}>
            <button type="submit">Submit</button>
          </Form>,
        );
        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
      });

      it('call and set submit results', async () => {
        expect.assertions(2);
        const controllerMock = jest.fn();
        const setSubmitResultsMock = jest.fn();

        const controllerCallback = async (data: FormData) => {
          controllerMock(data);
          return Promise.resolve(true);
        };

        const { getByText } = render(
          <Form controllerCallback={controllerCallback} setSubmitResult={setSubmitResultsMock}>
            <button type="submit">Submit</button>
          </Form>,
        );
        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(controllerMock).toHaveBeenCalledTimes(1));
        expect(setSubmitResultsMock).toHaveBeenCalledTimes(1);
      });

      it('call and reset values', async () => {
        expect.assertions(2);
        const controllerMock = jest.fn();
        const resetResultsMock = jest.fn();

        const controllerCallback = async (data: FormData) => {
          controllerMock(data);
          return Promise.resolve(true);
        };

        const { getByText } = render(
          <Form
            controllerCallback={controllerCallback}
            resetValuesCallback={resetResultsMock}
            isResetForm={true}
          >
            <button type="submit">Submit</button>
          </Form>,
        );
        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(controllerMock).toHaveBeenCalledTimes(1));
        expect(resetResultsMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
