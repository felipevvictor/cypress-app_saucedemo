import Login from '../pages/login/index';
import Inventory from '../pages/inventory/index.js'; 

describe('Adicionar ao Carrinho', () => {

    beforeEach(() => {
        Login.visitarPagina();
        Login.fazerLoginComSucesso();
        Inventory.validarAcessoPagina();
    });

    it('Adicionar um item ao carrinho com sucesso', () => {
       Inventory.adicionarValidarProduto();
    });

    it('Adicionar um item aleatorio carrinho com sucesso', () => {
       Inventory.adicionarProdutoAleatorio();
       Inventory.irParaOCarrinho();
       // Recupera o nome que guardamos via alias para validar
       cy.get('@ultimoItemAdicionado').then((nomeItem) => {
           Inventory.validarProdutoAdicionado(nomeItem);
       });
    });

    it('remover item do carrinho com sucesso', () => {
        Inventory.adicionarProdutoAleatorio();
        Inventory.irParaOCarrinho();
        Inventory.removerProduto();
    });

    it('remover item enquanto carrinho tem mais de um item', () => {
        // Agora você pode adicionar vários seguidos porque a função não muda de página!
        Inventory.adicionarProdutoAleatorio();
        Inventory.adicionarProdutoAleatorio();
        Inventory.adicionarProdutoAleatorio();
        
        // Só agora vamos para o carrinho ver o resultado
        Inventory.irParaOCarrinho();
        
        // Remove um item e valida se o badge e a lista atualizaram corretamente
        Inventory.removerProduto();
    });
});