const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//GET request - Fetches all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//POST request - Uploads a blog
//Verifies valid token to execute
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.date = new Date()
  blog.user = request.user._id

  if(!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

//DELETE request - Deletes a single blog ONLY of the authenticated user
//Verifies valid token to execute
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(request.user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(403).json({ error: 'user does not have permission' })
  }
})

//PUT/UPDATE a single blog
blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter