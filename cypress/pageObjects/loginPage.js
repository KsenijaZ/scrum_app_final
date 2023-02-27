class LoginPage {

    get modalTitle() {
        return cy.get('.vs-c-auth-modal-body__heading')
    }
    get signUpBtn() {
        return cy.contains('Sign Up')
    }
    get emailInput() {
        return cy.get('[type="email"]')
    }
    get passwordInput() {
        return cy.get('[type="password"]')
    }
    get submitBtn() {
        return cy.get('[type="submit"]')
    }

    login(email, password) {
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.submitBtn.click()
    }

}

export const loginPage = new LoginPage()