describe('Automation in Cypress', function()
{

    it('Automation in Cypress', function()
    {
        var mail = "wasifgazi123@gmail.com"
        var pass = "gazi12345"
        
        cy.visit('http://automationpractice.com/index.php')


        // go to Sign in page

        cy.get('[class="login"]').click()


        // Sign up

        cy.get('[id="email_create"]').clear().type(mail)
        cy.get('[id="SubmitCreate"]').should('be.visible').click()
        cy.url().should('include','account-creation')

        cy.get('[id="id_gender1"]').click()
        cy.get('[id="customer_firstname"]').clear().type("Gazi")
        cy.get('[id="customer_lastname"]').clear().type("Wasif")
        cy.get('[id="passwd"]').clear().type(pass)


        cy.get('select[id="days"]').select('1').should('have.value','1')
        cy.get('select[id="months"]').select('January').should('have.value','1')
        cy.get('select[id="years"]').select('1995').should('have.value','1995')
        cy.get('[id="company"]').clear().type("N/A")
        cy.get('[id="address1"]').clear().type("N/A")
        cy.get('[id="city"]').clear().type("Austin")
        cy.get('select[id="id_state"]').select('Texas').should('have.value','43')
        cy.get('[id="postcode"]').clear().type("78702")
        cy.get('[id="phone_mobile"]').clear().type("01616000400")
        cy.get('[id="alias"]').clear().type("CantShoot420")

        cy.get('[id="submitAccount"]').should('be.visible').click()
        cy.url().should('include','controller=my-account')

        cy.get('[class="logout"]').click()


        //  Sign in

        cy.get('[id="email"]').clear().type(mail)
        cy.get('[id="passwd"]').clear().type(pass)
        cy.get('[id="SubmitLogin"]').click()
        cy.url().should('include','index.php')


        cy.get('[class="sf-with-ul"]').contains("Dresses").click({ force : true })
        cy.url().should('include','id_category=8')


        // add item to Cart

        var product = "Printed Chiffon Dress"

        addToCart(product)

        function addToCart(name)
        {        
            var i = 0
            var m = 0
            cy.get('[class="right-block"]').each(function(elem) { 
                var text = elem.text()
                cy.log(text)
                if(text.includes(name)) { 
                    m = i
                    cy.get('[title="Add to cart"]').eq(m).invoke('show').click({ force : true })
                    return false
                }
                i++
            })
        }

        // close Pop-up Window

        cy.get('[title="Close window"]').should('be.visible').click() 


        // go to Homepage

        cy.get('[class="logo img-responsive"]').click()
        cy.url().should('include','index.php')

        // search Item
        
        var search = "shirts"
        cy.get('[id="search_query_top"]').clear().type(search)
        cy.get('[class="btn btn-default button-search"]').click()
        var searchURL = 'search_query=' + search
        cy.url().should('include', searchURL)


        // add First item to the Cart & close the Pop-up Window

        cy.get('[class="button ajax_add_to_cart_button btn btn-default"]').first().invoke('show').click({ force : true })
        cy.get('[title="Close window"]').should('be.visible').click()


        // go to Homepage , then Cart

        cy.get('[class="logo img-responsive"]').click()
        cy.url().should('include','index.php')
        
        cy.get('[title="View my shopping cart"]').click()
        cy.url().should('include','controller=order')


        // proceed to Checkout - Product

        cy.get('[title="Proceed to checkout"]').should('be.visible').last().click()

        // proceed to Checkout - Address

        cy.get('[name="processAddress"]').should('be.visible').click()


        // check Terms of Services, then Proceed to checkout - Carrier

        cy.get('[id="cgv"]').click({ force : true })
        cy.get('[name="processCarrier"]').should('be.visible').click()


        // payment - pay by Check

        cy.get('[class="cheque"]').click()
        cy.url().should('include','controller=payment')
        cy.get('[class="button btn btn-default button-medium"]').should('be.visible').click()
        cy.url().should('include','controller=order-confirmation')


        // Log out 

        cy.get('[class="logo img-responsive"]').click()
        cy.url().should('include','index.php')       
        cy.get('[class="logout"]').click()


    })

})

