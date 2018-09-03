// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  global.window.document.getElementById('root'),
)
registerServiceWorker()
