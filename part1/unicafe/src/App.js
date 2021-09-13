import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header1 = 'give feedback'
  const header2 = 'statistics'

  const goodClick = () => setGood(good+1)
  const neutralClick = () => setNeutral(neutral+1)
  const badClick = () => setBad(bad+1)

  return (
    <div>
      <Header header={header1}/>
      <Button text='good' handleClick={goodClick}/>
      <Button text='neutral' handleClick={neutralClick}/>
      <Button text='bad' handleClick={badClick}/>

      <Header header={header2}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good,neutral,bad}) => {
  let all = good+neutral+bad
  if(all === 0){
    return(
      <p>No Feedback Given</p>
    )
  }
  
  return(
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={(good-bad)/all}/>
        <StatisticLine text='positive' value={(100*good/all)+'%'} />  
      </tbody>
    </table>

  )
}

const StatisticLine = ({text,value}) => {
  return(
    <tr> 
     <td>{text}</td>
     <td>{value}</td>
    </tr>
  )
}

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}


export default App