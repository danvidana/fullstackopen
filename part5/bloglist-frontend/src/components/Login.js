import Togglable from './Toggable'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div>
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
    </div>
  )
}

export default Login