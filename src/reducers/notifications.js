// @flow

import { notification } from 'antd'

import { ADD_NOTIFICATION } from '../actions'
import type { Notification } from '../types'

type Action = {
  type: string,
  payload: Notification,
}

const notifications = (state: null = null, { type: actionType, payload }: Action) => {
  switch (actionType) {
    case ADD_NOTIFICATION:
      notification[payload.type]({
        message: payload.title,
        description: payload.description || '',
      })

      return null

    default:
      return state
  }
}

export default notifications
