import { elements as el} from "./elements";

class Inventory {
    
    validarAcessoPagina() {
        cy.url().should('include', 'inventory.html'); // Mudado para 'include' para ser mais flexível
    }

    // Navega para o carrinho clicando no ícone do badge
    irParaOCarrinho() {
        cy.get(el.irCarrinho).click();
    }

    // Método ideal para voltar quando estiver na página do carrinho
    continuarComprando() {
        cy.get('continueBuy').click();
        cy.url().should('include', 'inventory.html');
    }

    voltarParaPaginaProduto() {
        cy.get(el.btnBurguer).click();
        cy.get(el.urlInventory).click();
        cy.url().should('include', 'inventory.html');
    }

    // AGORA APENAS ADICIONA (Não navega para o carrinho de forma intrínseca)
    adicionarProdutoAleatorio() {
        return cy.get(`.inventory_item:has(${el.addCart})`)
        .then(($items) => {

            const randomIndex = Math.floor(Math.random() * $items.length);
            const item = $items[randomIndex];

            const itemNameToCart = item.querySelector(el.itemName).innerText;
            
            cy.wrap(itemNameToCart).as('ultimoItemAdicionado'); 

            cy.wrap(item).find(el.addCart).click();
        });
    }

    validarProdutoAdicionado(itemNameToCart) {
        cy.contains(el.itemName, itemNameToCart).should('exist');
    }

    adicionarValidarProduto() { 
        cy.get(el.itemName).first().invoke('text').then((itemNameToCart) => {
            cy.get(el.addCart).first().click();
            this.irParaOCarrinho();
            this.validarProdutoAdicionado(itemNameToCart);
        }); 
    }

    removerProduto() {
        cy.get(el.shopCart).invoke('text').then((badgeValue) => {
            const quantidadeAtual = Number(badgeValue);

            cy.get(el.removeItem).first().click();

            // Valida se decrementou no DOM do carrinho
            cy.get(el.itemName).should('have.length', quantidadeAtual - 1);

            if (quantidadeAtual - 1 <= 0) {
                cy.get(el.shopCart).should('not.exist');
            } else {
                cy.get(el.shopCart).should('have.text', String(quantidadeAtual - 1));
            }
        });
    }
}

export default new Inventory();