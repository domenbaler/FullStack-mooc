import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, removeBlog,sortAfterLike , currentUser }) => {

    const [showDetails, setShowDetails] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const handleLike = () => {
        const blogObject = {
            user: blog.user.id,
            likes: likes+1,
            title: blog.title,
            author: blog.author,
            url: blog.url
        }

        blogService.update(blogObject,blog.id)
        setLikes(likes+1)
        sortAfterLike()

    }

    const handleRemove = () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)){
            blogService.remove(blog.id)
            removeBlog(blog.id)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return(
        <div>
            { showDetails ?
                <div style={blogStyle}>
                    <div>
                        {blog.title} ( {blog.author} ) <button onClick={toggleDetails}>hide</button>
                    </div>
                    <div>{blog.url}</div>
                    <div>likes: {likes} <button id="like-blog" onClick={handleLike}>like</button></div>
                    <div>{blog.user.name}</div>
                    { blog.user.name === currentUser ?
                        <button id="remove-blog" onClick={handleRemove}>remove</button> : <div></div>
                    }

                </div>
                :
                <div style={blogStyle}>
                    {blog.title} ( {blog.author} ) <button id="show-blog-details" onClick={toggleDetails}>view</button>
                </div>
            }
        </div>

    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    removeBlog: PropTypes.func.isRequired,
    sortAfterLike: PropTypes.func.isRequired,
    currentUser: PropTypes.string.isRequired
}

export default Blog