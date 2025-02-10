// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'
import {expert, toBe, test} from '@jest/globals'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const container = document.createElement('div');
  document.body.append(container);
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  act(() => {
    const root = createRoot(container) // create a root for displaying content, react takes over managing the DOM inside it
    root.render(<Counter />) // display a react component inside it
  })


  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = container.querySelectorAll('button');
  // 🐨 get a reference to the message div:
  const message = container.firstChild.querySelector('div');
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')
  // 🐨 click the increment button (💰 act(() => increment.click()))
  act(() => {
    increment.click();
  })
  expect(message.textContent).toBe('Current count: 1');

  act(() => {
    decrement.click();
  })

  expect(message.textContent).toBe('Current count: 0')

  container.remove();
})

/* eslint no-unused-vars:0 */
