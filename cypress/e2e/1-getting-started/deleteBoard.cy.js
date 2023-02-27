import { loginPage } from "../../pageObjects/loginPage"
import { boards } from "../../pageObjects/boards"
import { constants } from "../../fixtures/constants"

describe('Create and delete board', () => {
    before(() => {
      cy.visit('/')
      loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
    })
  
    let boardId = 0;

    it('Create an additional board within an organization, valid data', () => {
        cy.intercept("POST", Cypress.env('apiUrl')+'/boards').as("newBoardData")
            //step 01
            boards.addBoardTitle(constants.randomTitle)
            boards.pageOneDot.should("have.class", "active")
            boards.nextBtn.click()

            //step 02
            boards.addBoardType() 
            boards.pageTwoDot.should("have.class", "active")
            boards.nextBtn.click()

            //step 03
            boards.addBoardConfig()
            boards.pageThrDot.should("have.class", "active")
            boards.nextBtn.click()

            //step 04
            boards.addBoardLogo(constants.imgUrl)
            boards.pageFourDot.should("have.class", "active")
            boards.nextBtn.click()

            //step 04
            boards.pageFiveDot.should("have.class", "active")
            boards.nextBtn.click()
        
        cy.wait('@newBoardData').then( result => {
            expect(result.response.statusCode).to.equal(201)
            boardId = result.response.body.id
            cy.url().should('contain', '/boards'+`/${boardId}`)
        })

    })

    it('Delete board using UI', () => {
        cy.intercept("DELETE", Cypress.env('apiUrl')+'/boards'+`/${boardId}`).as("newBoardDel")

            cy.visit(`/boards/${boardId}`)
            loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
            boards.deleteBoard()
            boards.boardsModal.click()
        
        cy.wait('@newBoardDel').then( result => {
            expect(result.response.statusCode).to.equal(200)
        })

    })
})