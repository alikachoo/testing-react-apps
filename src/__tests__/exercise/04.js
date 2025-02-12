// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  let submittedData = {}
  const handleSubmit = data => submittedData = data;

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)

  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  const username = screen.getByLabelText('Username');
  const password = screen.getByLabelText(/password/i);

  console.log(username)

  await userEvent.type(username, "Hello")
  await userEvent.type(password, 'password')
  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', {name: /submit/i});
  submitButton.click()

  // assert that submittedData is correct
  expect(submittedData).toEqual({username: 'Hello', password: 'password'})
})

/*
eslint
  no-unused-vars: "off",
*/
