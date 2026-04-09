import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './scss/main.scss'

const root = document.getElementById('root')

if (root == null) {
  throw new Error('No root element to create the React root')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
