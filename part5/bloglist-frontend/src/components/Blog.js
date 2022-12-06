import { useState } from "react"

const Blog = ({blog, handleLike}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
        <button onClick={likeBlog} >like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      </div>
  </div>
)}

export default Blog