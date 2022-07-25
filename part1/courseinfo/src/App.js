const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.partExs}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partExs={props.part1Exs}/>
      <Part partExs={props.part2Exs}/>
      <Part partExs={props.part3Exs}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercisesTotal}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1Exs={part1 + ' ' + exercises1} part2Exs={part2 + ' ' + exercises2} part3Exs={part3 + ' ' + exercises3} />
      <Total exercisesTotal={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App;
