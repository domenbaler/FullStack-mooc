const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async() => {
    await Blog.deleteMany({})  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[4])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[5])
    await blogObject.save()
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

test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach( blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Nothing",
        author: "Mr. Nobody",
        url: "https://nothing.com/",
        likes: 8
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogs.map(blog => blog.author)
    expect(authors).toContain(
        "Mr. Nobody"
    )

})

test('added blog without property likes should have 0 likes', async () => {
    const newBlog = {
        title: "NoLikes",
        author: "Mr. Nobodylikesme",
        url: "https://nothing.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const modifiedBlogs = blogs.map(blog => newishBlog ={
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
    })

    expect(modifiedBlogs).toContainEqual({
        title: "NoLikes",
        author: "Mr. Nobodylikesme",
        url: "https://nothing.com/",
        likes: 0
    })
})

test('blog without title or url should not be added to database', async () => {
    const newBlog = {
        author: "Mr. Nobodylikesme",
        likes: 9
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('blog can be deleted', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToDelete = startingBlogs[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const endingBlogs = await helper.blogsInDb()
    expect(endingBlogs).toHaveLength(startingBlogs.length - 1)

    const titles = endingBlogs.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('blog can be updated', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    blogToUpdate.likes = 33

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

    const endingBlogs = await helper.blogsInDb()
    expect(endingBlogs).toHaveLength(startingBlogs.length)

    const likes = endingBlogs.map(blog => blog.likes)
    expect(likes).toContain(blogToUpdate.likes)
})

afterAll( () => {
    mongoose.connection.close()
})