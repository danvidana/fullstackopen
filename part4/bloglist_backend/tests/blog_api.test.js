const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have the "id" property', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(r => expect(r.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Daniel A. Vidana',
    url: 'http://www.danvidana.com',
    likes: 21,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('async/await simplifies making async calls')
})

test('blogs with no "likes" property default to 0 "likes"', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Daniel A. Vidana',
    url: 'http://www.danvidana.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blogsWithNoLike = blogsAtEnd.filter(b => !b.likes)

  blogsWithNoLike.forEach(b => {
    expect(b.likes).toBe(0)
  })
})

test('created blogs without "title" or "url" properties respond with 400 Bad Request', async () => {
  const newBlogNoTitle = {
    author: 'Daniel A. Vidana',
    url: 'http://www.danvidana.com',
  }
  const newBlogNoURL = {
    title: 'async/await simplifies making async calls',
    author: 'Daniel A. Vidana',
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogNoURL)
    .expect(400)
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

test('likes on note are updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }
  delete updatedBlog.id

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  updatedBlog.id = blogToUpdate.id
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0]).toEqual(updatedBlog)
})

afterAll(() => {
  mongoose.connection.close()
})