import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if(state.filter === '') {
      return state.anecdotes
    }else {
      return state.anecdotes.filter(a => a.content.includes(state.filter))
    }
  })

  return(
    <>
      {anecdotes
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(updateNotification(`you voted ${anecdote.content}`))
              setTimeout(() => {
                dispatch(removeNotification())  
              }, 5000)
            }}
          />
      )}
    </>
  )
}

export default AnecdotesList