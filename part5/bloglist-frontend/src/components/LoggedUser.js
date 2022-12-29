import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoggedUser = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <p>
      {user.name} logged-in
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </p>
  )
}

export default LoggedUser