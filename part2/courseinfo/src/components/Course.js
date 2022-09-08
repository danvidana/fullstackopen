const Header = ({ text }) => <h2>{text}</h2>

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <h3>total of {totalExercises} exercises</h3>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}    
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course