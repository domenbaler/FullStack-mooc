const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name:1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id
  })


  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await User.findByIdAndUpdate(user._id,user, {new: false})

  response.status(201)
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== decodedToken.id.toString()){
    return response.status(401).json({error: 'Unauthorized'})
  }

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