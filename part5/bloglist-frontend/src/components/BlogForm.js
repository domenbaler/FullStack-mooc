import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const handleTitleChange = ({ target }) =>  setTitle(target.value)
    const handleAuthorChange = ({ target }) =>  setAuthor(target.value)
    const handleUrlChange = ({ target }) =>  setUrl(target.value)

    const addBlog = (event) => {
        event.preventDefault()

        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        createBlog(blogObject)

        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create a blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        className='title'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        className='author'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        className='url'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>

                <button id="create-blog" type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm