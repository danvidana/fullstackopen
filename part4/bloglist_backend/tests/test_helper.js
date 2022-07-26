const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Quantum computing is the future',
    author: 'John H. Hamlin',
    url: 'http://www.arizona.tec.edu',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const initialUser = [
  {
    username: 'root',
    user: 'Superuser',
    password: 'password'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb
}