const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://danvidana:IguanaMongoDB6@cluster0.nhwhph9.mongodb.net/?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      // if (args.author && args.genre) {
      //   const aBooks = books.filter(b  => b.author === args.author)
      //   return aBooks.filter(b => b.genres.find(b => b === args.genre))
      // } else if (args.author) {
      //   return books.filter(b  => b.author === args.author)
      // } else if (args.genre) {
      //   return books.filter(b  => b.genres.find(b => b === args.genre))
      // } else {
      //   return books
      // }
      return Book.find({})
    },

    allAuthors: async () => Author.find({})
  },

  Book: {
    author: async (root) => {
      console.log(root)
      console.log('a')
      const author = await Author.findOne({ id: root.author })
      console.log(author)
      return {
        name: author.name,
        id: author.id
      }
    }
  },

  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      const saveBook = async (author) => {
        const book = new Book({ ...args, author: author })
        try {
          await book.save()
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      if(!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          console.log(error.message)
        }
        saveBook(newAuthor)
      } else {
        saveBook(author)
      }
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})