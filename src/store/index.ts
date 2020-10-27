import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

interface actionType {
  type: string
  payload: {}
}

// 实时监测reducer
const TimeMonitorReducer = (state = {}, action: actionType) => {
  switch (action.type) {
    case 'saveTimeMonitorData':
      return (state = action.payload)

    default:
      return state
  }
}

// 收敛变形reducer
const transformReducer = (state = {}, action: actionType) => {
  switch (action.type) {
    case 'saveTransformData': // 保存收敛分析图数据
      return (state = action.payload)

    default:
      return state
  }
}

const Reducer = combineReducers({
  TimeMonitorReducer,
  transformReducer
})

const store = createStore(Reducer, applyMiddleware(thunk))

export default store

