import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'




test('BlogForm component updates state and calls onSuvmit', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog}/>
    )

    const inputTitle = component.container.querySelector('.title')
    const inputAuthor = component.container.querySelector('.author')
    const inputUrl = component.container.querySelector('.url')

    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
        target : { value: 'No time to Swim' }
    })

    fireEvent.change(inputAuthor, {
        target : { value: 'Bukalis' }
    })

    fireEvent.change(inputUrl, {
        target : { value: 'www.swimming.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('No time to Swim')
    expect(createBlog.mock.calls[0][0].author).toBe('Bukalis')
    expect(createBlog.mock.calls[0][0].url).toBe('www.swimming.com')
})