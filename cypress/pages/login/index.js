import { elements as el } from "./elements";
// Importamos o JSON usando o alias 'u' para manter compatibilidade com sua estrutura
const u = require('../../fixtures/users.json');

class Login {

    visitarPagina() {
        cy.visit('https://www.saucedemo.com/');
    }

    /**
     * Método Atômico e Reutilizável de Ação.
     * Se você passar uma string vazia ou nula '', o Cypress pula o .type() de forma segura.
     */
    preencherCamposELogar(username, password) {
        if (username) cy.get(el.username).type(username);
        if (password) cy.get(el.password).type(password);
        
        cy.get(el.loginButton).click(); 
    }

    /**
     * Métodos de Conveniência (Atalhos rápidos usando sua Fixture)
     */
    fazerLoginComSucesso() {
        this.preencherCamposELogar(u.validUser, u.passwd);
    }

    /**
     * Método Único de Validação de Erros.
     * Passamos a mensagem esperada por parâmetro, eliminando a necessidade de 3 funções de assert.
     */
    validarMensagemErro(mensagemEsperada) {
        cy.get(el.errorLogin)
            .should('be.visible')
            .and('contain.text', mensagemEsperada);

        cy.url().should('eq', 'https://www.saucedemo.com/');
    }
}

export default new Login();