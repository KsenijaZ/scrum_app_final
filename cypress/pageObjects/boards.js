class Boards {

    //create board

    get addBoardOrg01() {
        return cy.get('[class="vs-c-my-organizations-item-wrapper"] .organization-list-item:nth-child(1) .vs-c-my-organization__board-new')  
    }
    get orgList() {
        return cy.get('.vs-c-new-board-select')
    }
    get orgListItem() {
        return cy.get('.el-select-dropdown__item').first()
    }
    get boardTitle() {
        return cy.get('[name="name"]')
    }
    get pageOneDot() {
        return cy.get('.vs-c-dot-pagination li').eq(0)
    }
    get nextBtn() {
        return cy.get('[name="next_btn"]')
    }
    get scrumRadio() {
        return cy.get('input[value="scrum_board"]').invoke("show")
    }
    get pageTwoDot() {
        return cy.get('.vs-c-dot-pagination li').eq(1)
    }
    get logoInput() {
        return cy.get('input[type="file"]').invoke('show')
    }
    get uploadBtn() {
        return cy.get('.vs-u-text--right > .el-button--success')
    }
    get pageThrDot() {
        return cy.get('.vs-c-dot-pagination li').eq(2)
    }
    get pageFourDot() {
        return cy.get('.vs-c-dot-pagination li').eq(3)
    }
    get pageFiveDot() {
        return cy.get('.vs-c-dot-pagination li').eq(4)
    }
    get importConfig() {
        return cy.get('.el-form .el-form-item:nth-of-type(1) .vs-c-new-board-select')
    }
    get selectConfigItem() {
        return cy.get('.el-select-dropdown__item').first()
    }
    get selectTeamMemb() {
        return cy.get('.el-select-dropdown__item').first()
    }

    get selectTeamItem() {
        return cy.get('.el-form .el-form-item:nth-of-type(2) .vs-c-new-board-select')
    }
    get boardsModal() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }

    //first board within an organization, 4 step

    addBoardTitle(title) {
        this.addBoardOrg01.click()
        this.orgList.click()
        this.orgListItem.click()
        this.boardTitle.type(title)
    }
    addBoardType() {
        this.scrumRadio.check({force: true})
    }
    addBoardLogo(logoUrl) {
        this.logoInput.selectFile(logoUrl)
        this.uploadBtn.click()
    }

    //additional boards within an organization, 5 step
    addBoardConfig() {
        this.importConfig.click({force: true})
        this.selectConfigItem.click({force: true})
        this.selectTeamMemb.click({force: true})
        this.selectTeamItem.click({force: true})
    }

    //delete board
    get boardConfig() {
        return cy.get('[data-cy="board-configuration"]')
    }
    get deleteBtn() {
        return cy.get('.vs-c-btn--warning')
    }
    get modalOk() {
        return cy.get('.vs-c-confirmation-modal .el-button--success')
    }

    deleteBoard() {
        this.boardConfig.click()
        this.deleteBtn.click()
        this.modalOk.click()
    }

}
export const boards = new Boards()