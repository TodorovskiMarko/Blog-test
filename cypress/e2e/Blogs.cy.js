let username = 'Cy'
let email = 'newtester123@gmail.com'
let password = 'Asus2023'
let blogTitle = 'Test Blog'
let blogBody = 'Nov Blog'

describe('Test the functionality of the application', () => {


    beforeEach(() => {
        cy.visit('https://kuzmanpro.github.io/KuzMan-Blogs/')
        cy.get('[class="navbar"]').should('contain', 'KuzMan Blogs')
    });


    it('Register', () => {
        cy.get("[href='/KuzMan-Blogs/login']").click()
        cy.get('[class="no-account"]').should('be.visible')
        cy.get("[href='/KuzMan-Blogs/signup']").click()
        cy.get('[type="username"]').type(username)
        cy.get('[type="email"]').type(email)
        cy.get('[type="password"]').type(password)
        cy.get('[type="submit"]').click()

        Cypress.on('window:confirm', (t) => {
            expect(t).to.contains('Successfully signed in!')
        })

        cy.get('[class="navbar"]').should('contain', 'Sign Out')
    });


    it('Login with an existing account', () => {
        cy.get('[style="background-color: rgb(153, 0, 0);"]').should('contain', 'Sign Out').click()
        cy.get("[href='/KuzMan-Blogs/login']").should('contain', 'Log In').click()
        cy.get('[class="sign-in-container"]').should('be.visible')
        cy.get('[type="email"]').type(email)
        cy.get('[type="password"]').type(password)
        cy.get('[type="submit"]').click()

        Cypress.on('window:confirm', (t) => {
            expect(t).to.contains('Successfully logged in!')
        })

        cy.get('[class="navbar"]').contains('Sign Out').should('be.visible')
    });


    it('Post a new blog', () => {
        cy.get("[href='/KuzMan-Blogs/create']").click()
        cy.get('[class="create"]').should('be.visible').should('contain', 'Add a New Blog')
        cy.get('[type="text"]').type(blogTitle)
        cy.get("div[class='create'] form textarea").type(blogBody)
        cy.get("div[class='create'] form button").click()

        Cypress.on('window:confirm', (t) => {
            expect(t).to.contains('Blog created!')
        })
    });


    it('Delete your blog', () => {
        cy.get('[class="blog-list"]').contains(blogTitle).click()
        cy.get('[class="blog-details"]').contains('Delete Blog').click()

        Cypress.on('window:confirm', (t) => {
            expect(t).to.contains('Blog deleted!')
        })

        cy.get('[class="blog-list"]').should('not.contain', blogTitle)
    });


    it("Try to delete someone else's blog", () => {
        cy.get('[class="blog-list"]').should('contain', 'All Blogs')
        cy.get('[class="blog-preview"]').last().click()
        cy.get('[class="blog-details"]').should('contain', 'Delete Blog').click()

        Cypress.on('window:confirm', (t) => {
            expect(t).to.contains("Can't delete someone else's blog!")
        })
    });


    it('Switch light modes', () => {
        cy.get('[id="light"]').should('exist')
        cy.get('[class="switch"]').click()
        cy.get('[id="dark"]').should('exist')
    });
});