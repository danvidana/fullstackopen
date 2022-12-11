import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('call to create new blog has the right details', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={mockHandler} />)

  const titleInput = container.querySelector('.titleInput')
  const authorInput = container.querySelector('.authorInput')
  const urlInput = container.querySelector('.urlInput')

  const button = screen.getByText('create')

  await user.type(titleInput, 'Component testing')
  await user.type(authorInput, 'Test User')
  await user.type(urlInput, 'www.testwebsite.com')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Component testing')
  expect(mockHandler.mock.calls[0][0].author).toBe('Test User')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.testwebsite.com')
})