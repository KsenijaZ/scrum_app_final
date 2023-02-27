class Organization {

    get addNewOrgBox() {
        return cy.get('.vs-c-my-organization--add-new')
    }
    get orgNameInput() {
        return cy.get('input[name="name"]')
    }
    get pageDotOne() {
        return cy.get('.vs-c-dot-pagination li').eq(0)
    }
    get pageDotTwo() {
        return cy.get('.vs-c-dot-pagination li').eq(1)
    }
    get nextBtn() {
        return cy.get('[name="next_btn"]')
    }
    get orgLogoInput() {
        return cy.get('[type="file"]').invoke("show")
    }
    get saveBtn() {
        return cy.get('[name="save-btn"]')
    }
    get modalBtnOk() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }
    get confirmBtn() {
        return cy.get('.el-button--success')
    }

    newOrgAdd(name) {
        this.addNewOrgBox.click()
        this.orgNameInput.type(name)
    }
    nextStep() {
        this.nextBtn.click()
    }
    newOrgLogo(imgUrl) {
        this.orgLogoInput.selectFile(imgUrl)
        this.saveBtn.click()
    }

    //archive organization

    get settingOrg() {
        return cy.get('[data-cy="board-configuration"]')
    }

    get archiveBtn() {
        return cy.get('.vs-c-btn.vs-c-btn--spaced.vs-c-btn--success')
    }

    get archivedPageText() {
        return cy.get('.vs-l-archived-container > p')
    }

    //delete organization

    get settingsBtn() {
        return cy.get('[data-cy="organization-configuration"]')
    }
    get deleteOrgBtn() {
        return cy.get('.vs-c-btn--warning')
    }
    get modalPassInput() {
        return cy.get('.el-dialog__body input')
    }
    deleteOrg(password) {
        this.settingsBtn.click()
        this.deleteOrgBtn.click()
        this.modalPassInput.type(password)
        this.confirmBtn.click()
    }

}

export const organization = new Organization()