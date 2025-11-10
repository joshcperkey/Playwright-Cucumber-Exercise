Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    # CAUSE OF FAILURE: Expected title was incorrectly written as "Labs Swag", but the actual title is "Swag Labs"
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login as 'locked_out_user'
    # Added step to log a meaningful error message
    Then I should see the error message "This user is currently locked out. EPIC fail."