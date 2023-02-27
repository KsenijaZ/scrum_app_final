import { loginPage } from "../../pageObjects/loginPage"
import { organization } from "../../pageObjects/organizations"
import { constants } from "../../fixtures/constants"

describe('new organization test scenarios', () => {

    beforeEach(() => {
      cy.visit('/')
      loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
    })


    let orgId = 0;
  
    it('add new organization', () => {
        cy.intercept("POST", Cypress.env("apiUrl")+"/organizations").as('newOrgData')

            organization.newOrgAdd(constants.randomTitle)
            organization.pageDotOne.should('have.class', 'active')
            organization.nextStep()
            
            organization.pageDotTwo.should('have.class', 'active')
            organization.newOrgLogo(constants.imgUrl)
            organization.nextStep()
            organization.modalBtnOk.click()

        cy.wait("@newOrgData").then( result => {
            orgId = result.response.body.id
            expect(result.response.statusCode).to.eq(201)
            cy.url().should('contain', `${orgId}`)
        })
    })

})