import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import HasprCursor from 'haspr-cursor' // Import My Custom Package Wrapper
import 'haspr-cursor/dist/cursor.css' // Import My Custom Package Style sheet

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HasprCursor>
      <App />
    </HasprCursor>
  </React.StrictMode>
)
