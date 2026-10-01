Feature: Complete checkout
  # This scenario covers the full customer journey from login through order confirmation.

  @e2e @regression
  Scenario: Complete a purchase from login through order confirmation
    Given I navigate to the login page
    When I enter valid username and password
    And I click the login button
    Then I should be successfully logged in
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    When I proceed to checkout
    And I enter checkout information with first name "Ada", last name "Lovelace", and postal code "90210"
    Then the checkout overview should show "Sauce Labs Backpack"
    When I finish the order
    Then I should see the order confirmation message