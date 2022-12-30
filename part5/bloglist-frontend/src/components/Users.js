import { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(response => {
        setUsers(response)
      })
      .catch(error => {
        console.log(error)
        setUsers([])
      })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
          {users.map(user => {
            <tr>
              <th>{user.name}</th>
              <th>{user.blogs.length}</th>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users