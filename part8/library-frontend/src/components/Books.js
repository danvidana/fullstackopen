import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const filterBooks = () => {
    if (genre !== null) {
      return books.filter((b) => b.genres.includes(genre))
    } else {
      return books
    }
  }

  const getGenres = (books) => {
    const genres = books.reduce((total, book) => {
      return total.concat(book.genres)
    }, [])

    return [...new Set(genres)]
  }

  const genres = getGenres(books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.map((g) => (
        <button key={g} onClick={() => {setGenre(g)}}>{g}</button>
      ))}
      <button  onClick={() => {setGenre(null)}} >all genres</button>
      </div>
    </div>
  )
}

export default Books
