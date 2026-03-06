Feature: Fluxo de checkout no saucedemo.com

  Background:
    Given que estou logado como "standard_user" com senha "secret_sauce"

  Scenario: Adicionar produto ao carrinho e finalizar compra (positivo)
    When adiciono o produto "Sauce Labs Backpack" ao carrinho
    And vou para o carrinho
    And clico em Checkout
    And preencho dados de entrega "John", "Doe", "12345"
    And clico em Continue
    And clico em Finish
    Then vejo mensagem de sucesso "Thank you for your order!"

  Scenario: Checkout com CEP incompleto (negativo)
    When adiciono o produto "Sauce Labs Backpack" ao carrinho
    And vou para o carrinho
    And clico em Checkout
    And preencho apenas nome "John" e sobrenome "Doe" (sem CEP)
    And clico em Continue
    Then vejo mensagem de erro "Error: Postal Code is required"