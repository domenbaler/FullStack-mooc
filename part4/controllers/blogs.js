const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name:1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  
  const users = await User.find({})
  const firstUser = users[0]

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: firstUser._id
  })


  const savedBlog = await blog.save()

  firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
  await User.findByIdAndUpdate(firstUser._id,firstUser, {new: false})

  response.status(201)
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(200)
  response.json(updatedBlog)  
})


module.exports = blogsRouter