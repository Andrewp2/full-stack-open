import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = props => <tr> 
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>

const Statistics = (props) => {

  if(props.stats.all === 0) {
    return (
      <div>
      <h1>statistics</h1>
      <div>No feedback given</div>
    </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic value={props.stats.good} text="good" />
          <Statistic value={props.stats.neutral} text="neutral" />
          <Statistic value={props.stats.bad} text="bad" />
          <Statistic value={props.stats.all} text="all" />
          <Statistic value={props.stats.average} text="average" />
          <Statistic value={props.stats.positive + "%"} text="positive" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  //I clubbed the stats into a single object to make it cleaner
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  })

  //destructuring the array
  const {good, neutral, bad, all, average, positive} = stats;

  const incrementGood = () => {
    setStats({...stats, 
      good:good+1, 
      average:((good+1)-bad)/(all+1), 
      positive: ((good+1)/(all+1)) * 100, 
      all:all+1
    })
  }

  const incrementNeutral = () => {
    setStats({...stats, 
      neutral:neutral+1, 
      average:((good)-bad)/(all+1), 
      positive: ((good)/(all+1)) * 100, 
      all:all+1
    })
  }

  const incrementBad = () => {
    setStats({...stats, 
      bad:bad+1, 
      average:((good)-(bad+1))/(all+1), 
      positive: ((good)/(all+1)) * 100, 
      all:all+1
    })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => incrementGood()} text="good"/>
      <Button handleClick={() => incrementNeutral()} text="neutral"/>
      <Button handleClick={() => incrementBad()} text="bad"/>
      <Statistics stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)