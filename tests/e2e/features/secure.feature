Feature: Navegação pós-login e logout no the-internet.herokuapp.com

  Background:
    Given que estou logado como "tomsmith" com senha "SuperSecretPassword!"

  Scenario: Navegação para página segura após login (positivo)
    Then vejo mensagem de sucesso "You logged into a secure area!"
    And vejo botão de logout

  Scenario: Logout da página segura (positivo)
    When clico em Logout
    Then sou redirecionado para a página de login