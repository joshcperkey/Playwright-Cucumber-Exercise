Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

    Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    # TODO: Select Cart
    Then I select the cart
    # TODO: Select Checkout
    Then I select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I fill in the checkout form with First Name "Joshua", Last Name "Perkey", and Zip "48073"
    # TODO: Select Continue
    Then I select Continue
    # TODO: Select Finish
    Then I select Finish
    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the confirmation message "Thank you for your order!"
