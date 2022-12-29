import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'


const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(loginUser(username, password))
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            className='usernameInput'
            type='text'
            name='username'
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            className='passwordInput'
            name='password'
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm