const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

//DELETE a single blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//PUT/UPDATE a single blog
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    title,
    author,
    url,
    likes
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter