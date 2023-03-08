describe('Login', () => {
  it('user can log in with valid credentials', function () {
    cy.visit('/')
    cy.login(this.auth['leapsome'].username, this.auth['leapsome'].password)
    cy.get('[data-cy="sign-out"]').should('exist')
  })

  it('user can not log in with invalid credentials', function () {
    cy.visit('/')
    // user enters wrong password
    cy.login(this.auth['leapsome'].username, 'wrongpass')
    // check that logout is not available
    cy.get('[data-cy="sign-out"]').should('not.exist')
    // user gets feedback
    cy.get('[data-cy="error"]')
      .should('be.visible')
      .and('contain', 'Wrong username or password')
  })

  it('user can log out', function () {
    cy.loginByApi(
      this.auth['leapsome'].username,
      this.auth['leapsome'].password,
      '/feedback'
    )
    cy.get('[data-cy="sign-out"]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.get('#username').should('be.visible')
  })
})
