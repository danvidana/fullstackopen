import Togglable from './Toggable'
import BlogForm from './BlogForm'
import BlogsList from './BlogsList'

const Home = ({ user }) => {
  return (
    <>
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
      <BlogsList user={user} />
    </>
  )
}

export default Home