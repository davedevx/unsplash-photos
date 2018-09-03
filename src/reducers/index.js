import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import notifications from './notifications'

export default combineReducers({
  notifications,
  routing,
})
