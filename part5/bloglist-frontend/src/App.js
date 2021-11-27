import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)



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

  const addBlog = async (blogObject) => {
    const returned = await blogService.create(blogObject)
    setBlogs(blogs.concat(returned))
  
    console.log(returned)

    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
  
  const blogForm = () => {
    return(
        <Togglable>
          <BlogForm
          createBlog={addBlog}
          />
        </Togglable>
    ) 
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }
  

  const loginForm = () => (
    <LoginForm
      handleLogin = {handleLogin}
      handleUsernameChange={ ({target}) => setUsername(target.value)}
      handlePasswordChange={ ({target}) => setPassword(target.value)}
      username={username}
      password={password}
    />
  )

  return (
    <div>
      {user === null ? 
      <div>
        {loginForm()}
        <Notification message={errorMessage} isError={true}/>
      </div> : 
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