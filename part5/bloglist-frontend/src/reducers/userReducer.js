import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setErrorNotification } from './notificationReducer'

const initialState = {
  token: '',
  username: '',
  name: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return { token: '', username: '', name: '' }
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      //Notification management
      setErrorNotification('wrong username or password')
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    if (window.localStorage.getItem('loggedBlogappUser')) {
      window.localStorage.removeItem('loggedBlogappUser')
    }
    dispatch(removeUser())
  }
}

export default userSlice.reducer