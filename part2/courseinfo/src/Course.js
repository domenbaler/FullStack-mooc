import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({course}) => {
    return(
      <h1>{course.name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
      parts.map(part =>
        <Part key={part.id} part={part}/>  
      )
    )
  }
  
  const Part = ({part}) => {
    return(
      <div>
        <p> {part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum,part)=> sum+part.exercises,0)
    return(
      <p>Number of exercises: {total}</p>
    )
  }

export default Course