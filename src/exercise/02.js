// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {preProcessFile} from 'typescript'

/**
 * Create state that is synced with local storage
 * @param {string} key - The key to label this value in localStorage
 * @param {any} initialVal - The value to set in localStorage initially
 * @param {object} obj
 * @param {function} obj.serialize - The serialization function
 * @param {function} obj.deserialize - The deserialization function
 * @returns {[any, function]} The value and its setter function
 */
function useLocalStorageState(
  key,
  initialVal = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [val, setVal] = React.useState(() => {
    const storedVal = window.localStorage.getItem(key)
    if (storedVal) {
      return deserialize(storedVal)
    } else {
      return typeof initialVal === 'function' ? initialVal() : initialVal
    }
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(val))
  }, [key, serialize, val])
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
