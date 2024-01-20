import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store, persistor } from './Store/Store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  </Router>

)
