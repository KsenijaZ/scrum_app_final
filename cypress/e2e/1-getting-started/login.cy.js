import { loginPage } from "../../pageObjects/loginPage"

describe('login test scenarios', () => {
    beforeEach(() => {
      cy.visit('/')
      loginPage.modalTitle.should('have.text', 'Log in with your existing account')
      loginPage.signUpBtn.should('be.visible')
    })
  
    it('login with valid credentials', () => {
        cy.intercept("POST", Cypress.env("apiUrl")+"/login").as('loginData')

            loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))

        cy.wait("@loginData").then( result => {
            window.localStorage.setItem("token", result.response.token)
            expect(result.response.statusCode).to.eq(200)
        })

        cy.url().should('contain', '/my-organizations')
    })

})