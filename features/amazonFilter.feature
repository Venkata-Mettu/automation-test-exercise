Feature: Amazon website filter criteria

  Scenario: As a user, I want to list all the Samsung phones with given specifications

    Given I am on the Amazon home page
    When I navigate to the Mobile Phones department
    And I apply below filters
      | brand   | camera        | year | lowerPriceBound | upperPriceBound |
      | Samsung | 20 MP & above | 2023 | 50              | 100             |
    Then I should see list of Samsung phones