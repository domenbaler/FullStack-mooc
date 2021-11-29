describe('Blog app', function() {
    beforeEach(function () {
        cy.request('POST','http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Linus',
            username: 'Linux',
            password: 'jkWindows',
        }
        cy.request('POST', 'http://localhost:3003/api/users/',user)

        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeds with correct credentials', function () {
            cy.get('#username').type('Linux')
            cy.get('#password').type('jkWindows')
            cy.get('#login-button').click()
            cy.contains('Blogs')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('Linux')
            cy.get('#password').type('wrongPassword')
            cy.get('#login-button').click()
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach( function () {
            cy.request('POST', 'http://localhost:3003/api/login/', {
                username: 'Linux', password: 'jkWindows'
            }).then(response => {
                localStorage.setItem('loggedUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function() {
            cy.get('#show-create-options').click()

            cy.get('#title').type('Perfect Blog')
            cy.get('#author').type('Linux')
            cy.get('#url').type('news.ycombinator.com')

            cy.get('#create-blog').click()

            cy.contains('Perfect Blog')
            cy.contains('Linux')
        })

        describe('and a blog exists', function() {
            beforeEach( function () {
                cy.get('#show-create-options').click()

                cy.get('#title').type('Perfect Blog')
                cy.get('#author').type('Linux')
                cy.get('#url').type('news.ycombinator.com')

                cy.get('#create-blog').click()

            })

            it('blog can be liked', function () {
                cy.get('#show-blog-details').click()
                cy.get('#like-blog').click()
                cy.contains('likes: 1')
            })

            it('blog can be removed by its creator', function () {
                cy.get('#show-blog-details').click()
                cy.get('#remove-blog').click()
                cy.get('html').should('not.contain', 'Perfect blog')
            })

            it('blogs can be sorted by likes', function () {
                cy.get('#show-create-options').click()

                cy.get('#title').type('NotPerfect Blog')
                cy.get('#author').type('NotLinux')
                cy.get('#url').type('Not.news.ycombinator.com')

                cy.get('#create-blog').click()
                cy.wait(500)

                cy.contains('( Linux )').parent().contains('view').click()
                cy.contains('( NotLinux )').parent().contains('view').click()

                cy.contains('( NotLinux )').parent().contains('like').click()

                cy.contains('likes: 1')
                cy.get(':nth-child(4) > [style="padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;"]').contains('likes: 1')
                cy.get(':nth-child(5) > [style="padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;"]').contains('likes: 0')

                cy.contains('( Linux )').parent().contains('like').click()
                cy.wait(500)
                cy.contains('( Linux )').parent().contains('like').click()

                cy.get(':nth-child(4) > [style="padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;"]').contains('likes: 2')
                cy.get(':nth-child(5) > [style="padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;"]').contains('likes: 1')
            })

        })
    })
})