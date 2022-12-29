import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, username, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButton = { display: username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='hideWhenVisible' style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={showDeleteButton}>
          <button onClick={handleDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}

const BlogsList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .reverse()
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
            handleLike={() => {
              dispatch(likeBlog(blog))
            }}
            handleDelete={() => {
              dispatch(deleteBlog(blog.id))
              setSuccessNotification(`Blog ${blog.title} has been removed`)
            }}
          />
        )}
    </>
  )
}

export default BlogsList