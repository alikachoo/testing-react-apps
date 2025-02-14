// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'


beforeAll(
  () => {
    window.navigator.geolocation = {
      getCurrentPosition: jest.fn()
  }
}
);

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {

  const fakePosition = {coords: {latitude: 35, longitude: 139}}
  const {promise, resolve} = deferred();
  // pass in position
  window.navigator.geolocation.getCurrentPosition.mockImplementation(callback => {
    promise.then(() => callback(fakePosition));
  })

  render(<Location />)

  // 1. see loading screen
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  await act(async () => {
    resolve();
    await promise;
  }); // pass the loading screen, call with fake position
 
  // 2. see position details
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(`Latitude: ${fakePosition.coords.latitude}`)).toBeInTheDocument();
  expect(screen.getByText(`Longitude: ${fakePosition.coords.longitude}`)).toBeInTheDocument();
});

test('error message is displayed to the user', async () => {
  const errMessage = 'Position not available';
  const {promise, resolve} = deferred();
  window.navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
    promise.then(() => {error({
      code: 1,
      message: errMessage
    })} );
  })

  render(<Location />)
  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    resolve();
    await promise;
  });

  expect(screen.getByRole('alert')).toHaveTextContent(errMessage);
})

/*
eslint
  no-unused-vars: "off",
*/
