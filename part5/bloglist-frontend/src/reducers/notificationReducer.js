import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateMessage(state, action) {
      return { ...state, message: action.payload }
    },
    removeMessage(state) {
      return { ...state, message: '' }
    },
    changeToError(state) {
      return { ...state, type: 'error' }
    },
    changeToSuccess(state) {
      return { ...state, type: 'success' }
    }
  }
})

export const { updateMessage, removeMessage, changeToError, changeToSuccess } = notificationSlice.actions

export const setErrorNotification = (content) => {
  return async dispatch => {
    dispatch(updateMessage(content))
    dispatch(changeToError())
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export const setSuccessNotification = (content) => {
  return async dispatch => {
    dispatch(updateMessage(content))
    dispatch(changeToSuccess())
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export default notificationSlice.reducer