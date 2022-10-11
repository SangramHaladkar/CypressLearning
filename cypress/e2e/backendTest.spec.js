describe('Backend Test', () => {

    /*beforeEach("Login", () => {

        cy.intercept('GET', 'https://api.realworld.io/api/tags', { fixture: 'tags.json' });

        cy.visit('http://localhost:4200/login');
        cy.get('[placeholder="Email"]').type('artem.bondar16@gmail.com');
        cy.get('[placeholder="Password"]').type('CypressTest1');
        cy.get('form').submit();

    })*/

    it("Verify correct request and response", () => {

        cy.intercept('POST', 'https://api.realworld.io/api/articles/').as('postArticles')

        cy.contains('New Article').click();
        cy.get('[formcontrolname="title"]').type('New Articlecvfdsfsdfd3123sadsadasdsd');
        cy.get('[formcontrolname="description"]').type('Description');
        cy.get('[formcontrolname="body"]').type('Body');
        cy.contains(' Publish Article').click();

        cy.wait('@postArticles').then(xhr => {
            console.log(xhr);
            expect(xhr.response.statusCode).to.equal(200);
            expect(xhr.request.body.article.body).to.equal('Body');

        });
    });

    it("Verify popular tags are displayed", () => {
        cy.get('.tag-list').should('contain', 'cypress').and('contain', 'automation').and('contain', 'testing');
    });


    it("Verify global feed like count", () => {

        cy.intercept('GET', 'https://api.realworld.io/api/articles/feed*', { "articles": [], "articlesCount": 0 });
        cy.intercept('GET', 'https://api.realworld.io/api/articles*', { fixture: 'articles.json' });

        cy.contains('Global Feed').click();
        cy.get('app-article-list').find('button').then(likesButton => {
            expect(likesButton[0]).to.contain('1');
            expect(likesButton[1]).to.contain('5');
        });

        cy.fixture('articles.json').then(file => {

            const articleLink = file.articles[1].slug;
            file.articles[1].favoritesCount = 6;

            cy.intercept('POST', 'https://api.realworld.io/api/articles/' + articleLink + '/favorite', file);
        });

        cy.get('app-article-list').find('button').eq(1).click().should('contain', '6');
    });

    it.only("API Request ", () => {

        const userCred = {
            user
                :
                { email: "artem.bondar16@gmail.com", password: "CypressTest1" }
        }

        const bodyRequest = {
            article
                :
                { tagList: [], title: "TestFromShivraj", description: " xcvcvc", body: "API Test" }
        }

        cy.request('POST', "https://api.realworld.io/api/users/login", userCred)
            .its('body').then(body => {
                const token = body.user.token;
                cy.log(token);

                cy.request({
                    url: 'https://api.realworld.io/api/articles/',
                    headers: {
                        'authorization': 'Token ' + token,
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                    body: bodyRequest
                }).then(response => {
                    expect(response.status).to.equal(200);
                    cy.request({
                        url: 'https://api.realworld.io/api/articles/' + bodyRequest.article.title+'-1850',
                        headers: {
                            'authorization': 'Token ' + token,
                            'content-type': 'application/json'
                        },
                        method: 'DELETE'
                    }).then(deleteResponse => {
                        cy.log(deleteResponse);
                    });
                })
            });
    })
});