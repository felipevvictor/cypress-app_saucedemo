# 🧪 Automação de Testes E2E - Swag Labs (SauceDemo)

Este projeto contém a suíte de testes automatizados End-to-End (E2E) para a aplicação web [SauceDemo](https://www.saucedemo.com/), desenvolvida utilizando o framework **Cypress** com JavaScript. 

O principal objetivo deste projeto é validar os fluxos críticos de autenticação e gerenciamento de produtos no carrinho, aplicando as melhores práticas de Engenharia de Software e QA, como o padrão **Page Object Model (POM)** e **Clean Code**.

---

## 🚀 Tecnologias e Padrões Utilizados

* **Framework Principal:** [Cypress](https://www.cypress.io/)
* **Linguagem:** JavaScript / Node.js
* **Design Pattern:** Page Object Model (POM) para isolar os seletores do DOM das regras de teste.
* **Massa de Dados:** Centralizada via **Fixtures** (`cypress/fixtures/users.json`) para evitar códigos engessados (*hardcoded*).
* **Integração Contínua (CI/CD):** Configuração nativa para automação de esteiras com **GitLab CI/CD**.

---

## 🧠 Decisões de Arquitetura & Engenharia de QA

### 1. Métodos Parametrizáveis e DRY (Don't Repeat Yourself)
Em vez de criar múltiplos métodos específicos para testar diferentes tipos de login (ex: login inválido, login vazio, etc.), o Page Object de autenticação foi projetado de forma dinâmica. O método aceita parâmetros diretamente da spec ou da fixture, tratando fluxos alternativos e cenários negativos sem duplicação de código.

### 2. Estabilidade contra Testes Intermitentes (*Flaky Tests*)
Para o fluxo de adição aleatória de produtos, foi implementada uma inteligência de filtragem via pseudo-seletores do jQuery (`:has`). Isso garante que o Cypress interaja dinamicamente apenas com cards cujo botão de compra esteja ativo, eliminando colisões de estado e garantindo **100% de idempotência** nas execuções.

---

## 🏗️ Estrutura do Projeto

O repositório está estruturado da seguinte forma:

```text
├── cypress/
│   ├── e2e/               # Arquivos de especificações de testes (.cy.js)
│   ├── fixtures/          # Massa de dados estáticos para testes (JSON)
│   ├── pages/             # Classes do Page Object Model (POM)
│   │   ├── login/         # Seletores e ações da tela de login
│   │   └── inventory/     # Seletores e ações da tela de produtos/carrinho
│   └── support/           # Comandos customizados e configurações globais
├── .gitlab-ci.yml         # Pipeline de Integração Contínua do GitLab
├── cypress.config.js      # Arquivo de configuração global do Cypress
└── package.json           # Dependências e scripts do projeto
