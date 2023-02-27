import { loginPage } from "../../pageObjects/loginPage"
import { organization } from "../../pageObjects/organizations"
import { constants } from "../../fixtures/constants"

describe('New organization test scenarios', () => {

    before(() => {
      cy.visit('/')
      loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
    })


    let orgId = 0;
  
    it('Add new organization', () => {
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

    // it('Archive organization via settings page', () => {
    //     cy.intercept("PUT", Cypress.env("apiUrl")+`/organizations/${orgId}/status`).as('archivedOrg')

    //         cy.visit(`organizations/${orgId}/settings`)
    //         loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
    //         organization.archiveBtn.click()
    //         organization.confirmBtn.click()
    //         organization.archivedPageText.should('contain', 'Organization is currently archived. You can either reopen it or permanently delete it.')

    //     cy.wait("@archivedOrg").then( result => {
    //         expect(result.response.statusCode).to.eq(200)
    //         cy.url().should('contain', `${orgId}`)
    //     })
    // })

    it('Archive organization via organization card', () => {
        cy.intercept("PUT", Cypress.env("apiUrl")+`/organizations/${orgId}/status`).as('archivedOrg')

            cy.visit('/my-organizations')
            loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
            cy.get('.vs-c-my-organizations-item-wrapper')
            .find(`div[id="${orgId}"] span.vs-c-icon--archive`)
            .click({ force:true})
            organization.confirmBtn.click()

        cy.wait("@archivedOrg").then( result => {
            expect(result.response.statusCode).to.eq(200)
            //cy.url().should('contain', `${orgId}`)
        })
    })

    it('Confirm that organization is archived', () => {

        cy.visit('/my-organizations')
        loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))

        cy.get(`div[id="${orgId}"]`)
        .parent('.vs-c-my-organizations-item-wrapper--archived')
        .should('exist')

    })

})