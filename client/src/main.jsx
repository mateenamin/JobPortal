import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import Router from "./routes/index.routes";
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <Router />
    </Provider>
  </StrictMode>,
)

