const { randomString } = require('../support/utils/common')

describe('[POST] /feedback', () => {
  it('successfully creates feedback with valid data', () => {
    const rs = randomString(10)

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/feedback`,
      auth: {
        bearer: Cypress.env('bearer'),
      },
      body: {
        body: 'new feedback',
        receiverId: 2,
        title: rs,
      },
    }).as('req')

    cy.get('@req').its('status').should('eq', 200)
    cy.get('@req').then((response) => {
      const newId = response.body.id
      expect(response.body).to.deep.equal({
        id: newId,
        title: rs,
        body: 'new feedback',
        author: { id: 1, username: 'leapsome' },
        receiver: { id: 2, username: 'jane' },
      })
    })
  })

  it('user can not create feedback for themselves', () => {
    const rs = randomString(10)

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/feedback`,
      auth: {
        bearer: Cypress.env('bearer'),
      },
      failOnStatusCode: false,
      body: {
        body: 'new feedback',
        receiverId: 1,
        title: rs,
      },
    }).as('req')

    cy.get('@req').its('status').should('eq', 400)
    cy.get('@req').then((response) => {
      expect(response.body.message).to.equal(
        'User is not permitted to give themselves a feedback'
      )
    })
  })

  it('cannot create feedback without valid authentication', () => {
    const rs = randomString(10)

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/feedback`,
      failOnStatusCode: false,
      body: {
        body: 'new feedback',
        receiverId: 2,
        title: rs,
      },
    }).as('req')

    cy.get('@req').its('status').should('eq', 401)
    cy.get('@req').then((response) => {
      expect(response.body.message).to.equal(
        'Authorization is required for request on POST /feedback'
      )
    })
  })

  it('cannot create feedback for nonexistent user', () => {
    const rs = randomString(10)

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/feedback`,
      auth: {
        bearer: Cypress.env('bearer'),
      },
      failOnStatusCode: false,
      body: {
        body: 'abc',
        receiverId: 10,
        title: rs,
      },
    }).as('req')

    cy.get('@req').its('status').should('eq', 500)
  })

  it('cannot create empty feedback', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/feedback`,
      auth: {
        bearer: Cypress.env('bearer'),
      },
      failOnStatusCode: false,
      body: {
        body: null,
        receiverId: 2,
        title: null,
      },
    }).as('req')

    cy.get('@req').its('status').should('eq', 400)
  })
})
