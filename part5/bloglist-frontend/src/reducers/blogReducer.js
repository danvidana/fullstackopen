import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.update(blog.id, blog)
    dispatch(updateBlog(newBlog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
