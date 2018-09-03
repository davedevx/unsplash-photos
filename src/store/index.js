// @flow

import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

const isDevEnv = (): boolean => process.env.NODE_ENV === 'development'

const initialState = {}
const middlewares = []

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isDevEnv()
    && global.window && global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose
/* eslint-enable */

if (isDevEnv()) {
  const logger = createLogger({
    collapsed: true,
  })

  middlewares.push(logger) // logger has to be the last item
}

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
)
