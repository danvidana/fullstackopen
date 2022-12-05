const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  if (messageType === 'success') {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

export default Notification