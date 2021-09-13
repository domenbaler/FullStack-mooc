import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const heading1 = 'Anecdote of the day'
  const heading2 = 'Anecdote with most votes'

  const emptyArray = new Array(anecdotes.length).fill(0) 
  
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(emptyArray)

  const nextAnecdote = () => setSelected(    (selected + 1 + Math.floor(Math.random()*5) )%7    )
  
  const handleVoting = () => {
      const newPoints =  [...points]
      newPoints[selected]++
      setPoints(newPoints)
  }

  const mostVotes = points.indexOf(Math.max(...points))

  return (
    <div>
      <Heading heading={heading1}/>
      <Message1 message={anecdotes[selected]}/>
      <Message2 message={points[selected]}/>

      <Button handleClick={handleVoting} text='vote'/>
      <Button handleClick={nextAnecdote} text='next anecdote'/>

      <Heading heading={heading2}/>      
      <Message1 message={anecdotes[mostVotes]}/>
      <Message2 message={points[mostVotes]}/>

    </div>
  )
}

const Message1 = ({message}) =>{
  return(
    <p>{message}</p>
  )
}

const Message2 = ({message}) =>{
  return(
    <p>has {message} votes</p>
  )
}

const Heading = ({heading}) => {
  return(
    <h1>{heading}</h1>
  )
}

const Button = ({handleClick,text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

export default App