import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route
//   Link,
//   useNavigate,
//   useMatch
} from 'react-router-dom'

import Notification from './components/Notification'
import Login from './components/Login'
import LoggedUser from './components/LoggedUser'
import Home from './components/Home'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {user.username === '' ?
        (<Login user={user} />) :
        (
          <div>
            <LoggedUser user={user} />
            <Routes>
              <Route path='/' element={<Home user={user}/>} />
              <Route path='/users' element={<Users />} />
            </Routes>
          </div>
        )
      }
    </div>
  )
}

export default App
