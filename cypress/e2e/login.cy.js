import Login from '../pages/login/index';

describe('Cenários de Teste de Login', () => {

    beforeEach(() => {
        Login.visitarPagina();
    });

    it('Login com sucesso', () => {
        Login.fazerLoginComSucesso();
        // Aqui você valida o acesso à página de inventário
    });

    it('Login com credenciais inválidas', () => {
        Login.preencherCamposELogar('usuario_invalido', 'senha_errada');
        Login.validarMensagemErro('Epic sadface: Username and password do not match any user in this service');
    });

    it('Login sem preencher o usuário', () => {
        // Passamos string vazia no usuário. O 'if' da função vai ignorar o campo.
        Login.preencherCamposELogar('', 'secret_sauce');
        Login.validarMensagemErro('Epic sadface: Username is required');
    });

    it('Login sem preencher a senha', () => {
        Login.preencherCamposELogar('standard_user', '');
        Login.validarMensagemErro('Epic sadface: Password is required');
    });
});