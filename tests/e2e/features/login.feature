Feature: Login na aplicação the-internet.herokuapp.com

  Scenario: Login válido e navegação para página segura (positivo)
    Given que estou na página de login
    When preencho usuário "tomsmith" e senha "SuperSecretPassword!"
    And clico em Login
    Then vejo mensagem de sucesso "You logged into a secure area!"

  Scenario: Login com senha incorreta (negativo)
    Given que estou na página de login
    When preencho usuário "tomsmith" e senha "errada"
    And clico em Login
    Then vejo mensagem de erro "Your password is invalid!"

  Scenario: Login com usuário inexistente (negativo)
    Given que estou na página de login
    When preencho usuário "naoexiste" e senha "SuperSecretPassword!"
    And clico em Login
    Then vejo mensagem de erro "Your username is invalid!"

  Scenario: Login com campos em branco (negativo)
    Given que estou na página de login
    When clico em Login sem preencher usuário e senha
    Then vejo mensagem de erro "Your username is invalid!"