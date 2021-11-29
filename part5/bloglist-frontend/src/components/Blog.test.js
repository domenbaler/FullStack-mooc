import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'How to',
    author: 'anon',
    url: 'www.no.com',
    user: {
        name: 'powerUser'
    }
}

const removeBlog = () => { }
const sortAfterLike = () => { }
const currentUser = 'Bon Jovi'

test('Without button click show only title and author', () => {
    const component = render(
        <Blog blog={blog} removeBlog={removeBlog} sortAfterLike={sortAfterLike} currentUser={currentUser}/>
    )

    expect(component.container).toHaveTextContent('How to')
    expect(component.container).toHaveTextContent('anon')

    expect(component.container).not.toHaveTextContent('powerUser')
    expect(component.container).not.toHaveTextContent('www.no.com')
    expect(component.container).not.toHaveTextContent('likes')
})

test('With button clicked show all details', () => {
    const component = render(
        <Blog blog={blog} removeBlog={removeBlog} sortAfterLike={sortAfterLike} currentUser={currentUser}/>
    )

    const button = component.getByText( 'view' )
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('How to')
    expect(component.container).toHaveTextContent('anon')

    expect(component.container).toHaveTextContent('powerUser')
    expect(component.container).toHaveTextContent('www.no.com')
    expect(component.container).toHaveTextContent('www.no.com')

})

test('When like button is clicked twice, onClick executes twice', () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} removeBlog={removeBlog} sortAfterLike={mockHandler} currentUser={currentUser}/>
    )

    const button = component.getByText( 'view' )
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})