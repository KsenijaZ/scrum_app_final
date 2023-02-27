import { loginPage } from "../../pageObjects/loginPage"
import { organization } from "../../pageObjects/organizations"
import { constants } from "../../fixtures/constants"


describe('Add and delete organization test', () => {

    before(() => {
        cy.visit('/')
        loginPage.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    })

    let orgId = 0;
    let orgName = undefined;

    it('Create new organization', () => {

        cy.intercept('POST', Cypress.env('apiUrl')+'/organizations').as('newOrg')

            organization.newOrgAdd(constants.randomTitle)
            organization.pageDotOne.should('have.class', 'active')
            organization.nextStep()
            
            organization.pageDotTwo.should('have.class', 'active')
            organization.newOrgLogo(constants.imgUrl)
            organization.nextStep()
            //organization.nextStep()
            organization.modalBtnOk.click()

        cy.wait(6000)
        cy.wait('@newOrg').then( result => {
            expect(result.response.statusCode).to.equal(201)
            orgId = result.response.body.id
            orgName = result.response.body.name
            cy.log(result)
            cy.log(orgId)
            cy.log(orgName)
        })
 
    })

    it('Delete created organization', () => {
        cy.intercept('POST', Cypress.env('apiUrl')+`/organizations/${orgId}`).as('delOrg')

            cy.visit( `/organizations/${orgId}/settings`)
            loginPage.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
            organization.deleteOrg(Cypress.env('validPassword'))
            
        cy.wait('@delOrg').then(result => {
            expect(result.response.statusCode).to.equal(201)
            cy.log(result)
            expect(result.response.body.id).to.eq(orgId)
            expect(result.response.body.name).to.eq(orgName)
        })


    })

    it('Confirm that organization is succesfully deleted', () => {
        cy.intercept('GET', Cypress.env('apiUrl')+`/my-organizations`).as('listOrg')

            cy.visit( `/my-organizations`)
            loginPage.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
            
        cy.wait('@listOrg').then(result => {
            expect(result.response.statusCode).to.equal(200)
            expect(result.response.body[result.response.body.length - 1].id).not.eq(orgId)
            expect(result.response.body[result.response.body.length - 1].name).not.eq(orgName)
        })


    })

})