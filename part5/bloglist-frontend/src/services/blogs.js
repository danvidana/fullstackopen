import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, { ...object, likes: object.likes + 1 })
  return response.data
}

export default {
  getAll,
  create,
  like,
  deleteBlog,
  setToken,
  update
}