import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === '') {
    return null
  }

  if (notification.type === 'success') {
    return <div className='success'>{notification.message}</div>
  } else {
    return <div className='error'>{notification.message}</div>
  }
}

export default Notification
