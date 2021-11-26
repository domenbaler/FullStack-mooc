import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log(loggedUserJSON)

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    
    try{
      const user = await loginService.login({
          username, password
      })

      window.localStorage.setItem(
        'loggedUser',JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} isError={true}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={ ({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={ ({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const returned = await blogService.create(blogObject)
    setBlogs(blogs.concat(returned))
    setAuthor('')
    setTitle('')
    setUrl('')
    console.log(returned)

    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
  
  const blogForm = () => (
    <div>
      <h3>Create a blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
          value={title}
          onChange={({target}) =>  setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          value={author}
          onChange={({target}) =>  setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          value={url}
          onChange={({target}) =>  setUrl(target.value)}
          />
        </div>
    
        <button type="submit">create</button>
      </form>
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }
  

  return (
    <div>
      {user === null ? loginForm() : 
        <div>
          <h2>Blogs</h2>
          <Notification message={errorMessage} isError={false}/>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p> 
          {blogForm()}
          {blogs.map(blog =>  <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App