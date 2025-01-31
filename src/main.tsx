import React from 'react'
import ReactDOM from 'react-dom/client'
import BibleGame from './components/BibleGame'
import './public/static/css/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BibleGame />
  </React.StrictMode>,
)
