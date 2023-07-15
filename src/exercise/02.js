// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/**
 * Create state that is synced with local storage
 * @param {string} key The key to label this value in localStorage
 * @param {any} initialVal The value to set in localStorage initially
 * @returns {[any, function]} The value and its setter function
 */
function useLocalStorageState(key, initialVal) {
  function getStorageOrInitialVal() {
    const storedJSON = window.localStorage.getItem(key)
    const storedVal = JSON.parse(storedJSON)
    return storedVal ?? initialVal
  }
  const [val, setVal] = React.useState(() => getStorageOrInitialVal())
  React.useEffect(
    () => window.localStorage.setItem(key, JSON.stringify(val)),
    [key, val],
  )
  return [val, setVal]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('greetingName', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
