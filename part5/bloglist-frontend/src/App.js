import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './components/Toggable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { setErrorNotification, setSuccessNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //Notification management
      setErrorNotification('wrong username or password')
    }
  }

  const handleLogout = () => {
    if (window.localStorage.getItem('loggedBlogappUser')) {
      window.localStorage.removeItem('loggedBlogappUser')
    }
    setUser(null)
  }

  const likeBlog = async (blogObject) => {
    await blogService.like(blogObject)
  }

  const deleteBlog = async (blogObject) => {
    await blogService.deleteBlog(blogObject.id)
    setBlogs(blogs.filter((b) => b.id !== blogObject.id))

    //Notification management
    setSuccessNotification(`${blogObject.title} by ${blogObject.author} was removed`)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .reverse()
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
                handleLike={likeBlog}
                handleDeleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
