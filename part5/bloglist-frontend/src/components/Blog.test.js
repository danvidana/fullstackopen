import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content that is not hidden by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test User',
    url: 'www.testwebsite.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testUser'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const defaultElement = container.querySelector('.hideWhenVisible')

  expect(defaultElement).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(defaultElement).not.toHaveTextContent(blog.likes)
  expect(defaultElement).not.toHaveTextContent(blog.url)
})

test('renders content that is not hidden anymore after button click', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test User',
    url: 'www.testwebsite.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testUser'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(blog.likes)
})

test('props is called twice upon double like button click', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test User',
    url: 'www.testwebsite.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testUser'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

