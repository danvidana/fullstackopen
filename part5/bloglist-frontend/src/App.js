import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Togglable from './components/Toggable'
import BlogsList from './components/BlogsList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import LoggedUser from './components/LoggedUser'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {user.username === '' ?
        (<Login user={user} />) :
        (
          <div>
            <LoggedUser user={user} />
            {blogForm()}
            <BlogsList user={user} />
          </div>
        )
      }
    </div>
  )
}

export default App
