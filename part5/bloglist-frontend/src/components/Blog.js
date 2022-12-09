import { useState, useEffect } from "react"

const Blog = ({blog, username, handleLike, handleDeleteBlog}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [userOwner, setUserOwner] = useState(false)

  useEffect(() => {
    if(username === blog.user.username) {
      setUserOwner(!userOwner)
    }
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButtton = {display: userOwner ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    const newBlog = Object.assign({}, blog)
    delete newBlog.user
    handleLike({
      ...newBlog,
      likes: likes + 1
    })
    setLikes(likes + 1)
  }

  const deleteBlog = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      event.preventDefault()
      const newBlog = Object.assign({}, blog)
      delete newBlog.user
      handleDeleteBlog(
        newBlog
      )
    }
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={showDeleteButtton}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
  </div>
)}

export default Blog