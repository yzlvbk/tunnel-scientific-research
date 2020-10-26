import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

interface actionType {
  type: string
  payload: {}
}

// 实时监测reducer，接受两个参数state、action，返回最新的state
const TimeMonitorReducer = (state = {}, action: actionType) => {
  switch (action.type) {
    case 'saveTimeMonitorData':
      return (state = action.payload)

    default:
      return state
  }
}
const store = createStore(TimeMonitorReducer, applyMiddleware(thunk))

export default store

