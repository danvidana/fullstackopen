Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (content) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: content,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //New user is created
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('.titleInput').type('a blog created by cypress')
      cy.get('.authorInput').type('Matti Luukkainen')
      cy.get('.urlInput').type('www.testwebsite.com')

      cy.get('#create-button').click()

      cy.contains('a blog created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'a blog created by cypress',
          author: 'Matti Luukkainen',
          url: 'www.testwebsite.com'
        }
        cy.createBlog(blog)
      })

      it('User can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('1')
      })

      it('User can delete a blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'a blog created by cypress')

      })
    })
  })
})