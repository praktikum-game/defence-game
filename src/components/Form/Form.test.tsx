import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from './Form';

describe('test Form component', () => {
  it('render with children', () => {
    expect.assertions(1);
    render(
      <Form>
        <p>Test text</p>
      </Form>,
    );
    expect(screen.getByText('Test text')).toHaveTextContent('Test text');
  });

  describe('submit', () => {
    it('with invalid data', () => {
      expect.assertions(1);
      const controllerCallback = jest.fn();
      const validationResults = [{ valid: false, message: '' }];
      render(
        <Form controllerCallback={controllerCallback} validationResults={validationResults}>
          <button type="submit">Submit</button>
        </Form>,
      );
      fireEvent.click(screen.getByText('Submit'));

      expect(controllerCallback).toHaveBeenCalledTimes(0);
    });

    describe('controller callback', () => {
      it('call', async () => {
        expect.assertions(1);
        const mockFn = jest.fn();
        const controllerCallback = async (data: FormData) => Promise.resolve(mockFn(data));

        render(
          <Form controllerCallback={controllerCallback}>
            <button type="submit">Submit</button>
          </Form>,
        );
        fireEvent.click(screen.getByText('Submit'));

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

        render(
          <Form controllerCallback={controllerCallback} setSubmitResult={setSubmitResultsMock}>
            <button type="submit">Submit</button>
          </Form>,
        );
        fireEvent.click(screen.getByText('Submit'));

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

        render(
          <Form
            controllerCallback={controllerCallback}
            resetValuesCallback={resetResultsMock}
            isResetForm={true}
          >
            <button type="submit">Submit</button>
          </Form>,
        );
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => expect(controllerMock).toHaveBeenCalledTimes(1));
        expect(resetResultsMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
