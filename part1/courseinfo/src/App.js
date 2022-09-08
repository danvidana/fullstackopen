// const Header = (props) => {
//   return (
//     <h1>{props.course}</h1>
//   )
// }

import { useState } from "react";

// const Part = (props) => {
//   return (
//     <>
//       <p>{props.parts}</p>
//     </>
//   )
// }

// const Content = (props) => {
//   return (
//     <div>
//       <Part parts={props.parts[0].name + ' ' + props.parts[0].exercises}/>
//       <Part parts={props.parts[1].name + ' ' + props.parts[1].exercises}/>
//       <Part parts={props.parts[2].name + ' ' + props.parts[2].exercises}/>
//     </div>
//   )
// }

// const Total = (props) => {
//   return (
//     <>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10 
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

// export default App;

///////////////////////////////////////////////////////////////////////////////////////////////////
/* PART 1.c

import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    setCounter(counter - 1)
  }

  const setToZero = () => {
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button
        onClick={increaseByOne}
        text={'plus'}
      />
      <Button
        onClick={setToZero}
        text={'zero'}
      />
      <Button
        onClick={decreaseByOne}
        text={'minus'}
      />
    </div>
  )
}

*/

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text={'left'} />
      <Button handleClick={handleRightClick} text={'right'} />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;