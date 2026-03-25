Feature: Checkout simples no e-commerce (Sauce Demo)
  Como usuário do e-commerce
  Quero comprar produtos
  Para finalizar um pedido com sucesso

  Background:
    Given que estou no catálogo do e-commerce autenticado como "standard_user" e senha "secret_sauce"

  @positivo
  Scenario: Comprar 2 produtos com dados válidos
    When adiciono os produtos "Sauce Labs Backpack" e "Sauce Labs Bike Light" ao carrinho
    And vou para o carrinho e inicio o checkout
    And preencho os dados de envio: primeiro nome "Erik", último nome "Chaves", CEP "01001-000"
    And finalizo a compra
    Then vejo a confirmação de pedido com a mensagem "Thank you for your order!"

  @negativo
  Scenario: CEP ausente no checkout
    When adiciono o produto "Sauce Labs Backpack" ao carrinho
    And vou para o carrinho e inicio o checkout
    And preencho os dados de envio: primeiro nome "Erik", último nome "Chaves", CEP ""
    Then vejo erro no checkout contendo "Error: Postal Code is required"

  @negativo
  Scenario: Primeiro nome ausente no checkout
    When adiciono o produto "Sauce Labs Backpack" ao carrinho
    And vou para o carrinho e inicio o checkout
    And preencho os dados de envio: primeiro nome "", último nome "Chaves", CEP "01001-000"
    Then vejo erro no checkout contendo "Error: First Name is required"