import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url
    })

    dispatch(createBlog(newBlog))
    dispatch(setSuccessNotification(`Created '${title}' blog`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            className='titleInput'
            type="text"
            name="title"
          />
        </div>
        <div>
          author:
          <input
            className='authorInput'
            type="text"
            name="author"
          />
        </div>
        <div>
          url:
          <input
            className='urlInput'
            type="text"
            name="url"
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm