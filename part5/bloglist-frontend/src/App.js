import { useState, useEffect } from 'react'

import Togglable from './components/Toggable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }catch(exception) {
      //Notification management
      setMessageType('error')
      setMessage(`wrong username or password`)
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)
    }
  }

  const handleLogout = (event) => {
    if(window.localStorage.getItem('loggedNoteappUser')) {
      window.localStorage.removeItem('loggedNoteappUser')
    }
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    //Notification management
    setMessageType('success')
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 2000)
  }

  const likeBlog = async (blogObject) => {
    await blogService.like(blogObject)
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
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <Notification
        message={message}
        messageType={messageType}
      />
      <h2>blogs</h2>
      {user === null ?
        <div>
          {loginForm()}
        </div>
        :
        <div>
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .reverse()
            .map(blog =>
              <Blog 
                key={blog.id}
                blog={blog}
                handleLike={likeBlog} />
            )
          }
        </div>
      }
    </div>
  )
}

export default App
