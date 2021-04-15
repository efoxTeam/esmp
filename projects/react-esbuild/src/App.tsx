import React from 'https://esm.sh/react'
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import './app.scss'
import d from './app.json'
console.log(d)
confetti()
setInterval(() => confetti(), 5000)
export default function App() {
  return (
    <div className="app">
      <h1>Hello ESMP</h1>
      <p>use esm instead module federation</p>
    </div>
  )
}
