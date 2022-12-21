import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Initial notification message'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      const content = action.payload
      return content
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { updateNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(updateNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000 * seconds)
  }
}
export default notificationSlice.reducer