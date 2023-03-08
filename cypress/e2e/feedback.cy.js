const { randomString } = require('../support/utils/common')
const numberOfSeededFeedbacks = 8

describe('Feedback', () => {
  it('user can access feeback page and see all feedbacks', function () {
    cy.loginByApi(
      this.auth['leapsome'].username,
      this.auth['leapsome'].password,
      '/feedback'
    )

    cy.get('[data-cy="feedback-card"]').should(
      'have.length',
      numberOfSeededFeedbacks
    )
  })

  it('user can create a feedback for another user', function () {
    const rs = randomString(20)
    const fb =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae mauris a nisi feugiat accumsan.'

    cy.intercept('POST', `${Cypress.env('api_url')}/feedback`).as(
      'postFeedback'
    )

    cy.loginByApi(
      this.auth['leapsome'].username,
      this.auth['leapsome'].password,
      '/feedback'
    )

    cy.get('[data-cy="feedback-card"]').then(($el) => {
      let numberOfFeedbacks = $el.length

      cy.get('[data-cy="create-new-feedback"]').click()
      cy.get('[data-cy="create-feedback-modal"]').within(() => {
        cy.get('#title').type(rs)
        cy.get('#body').type(fb)
        cy.get(
          '[data-cy="receiver-select"] option:contains("leapsome")'
        ).should('not.exist') // check if dropdown contains current user
        cy.get('[data-cy="receiver-select"]').select('john')
        cy.get('button[type="submit"]').click()
      })

      cy.wait('@postFeedback')

      cy.get('[data-cy="create-feedback-modal"]').should('not.exist')

      // check that the feedback was created and the feedback card is properly rendered
      cy.contains('[data-cy="feedback-card"]', rs).as('newFeedback')
      cy.get('@newFeedback').within(() => {
        cy.get('[data-cy="feedback-author"]')
          .invoke('text')
          .should('eq', 'leapsome')
        cy.get('[data-cy="feedback-receiver"]')
          .invoke('text')
          .should('eq', 'john')
        cy.get('[data-cy="feedback-title"]').invoke('text').should('eq', rs)
        cy.get('[data-cy="feedback-body"]').invoke('text').should('eq', fb)
      })

      // check that all existing feedbacks plus the new one are present
      cy.get('[data-cy="feedback-card"]')
        .its('length')
        .should('eq', numberOfFeedbacks + 1)
    })
  })
})
