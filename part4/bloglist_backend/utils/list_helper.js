const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favoriteBlog, blog) => {
    if(blog.likes > favoriteBlog.likes) {
      return blog
    }else {
      return favoriteBlog
    }
  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}