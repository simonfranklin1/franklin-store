import { catalogo } from "./utilidades";
import { adicionarAoCarrinho} from "./carrinho"

export const renderizarCatalogo = () => {
    catalogo.map((produto) => {
      
      const cardProduto = `
        <div id="card-produto-${produto.id}" class="card ${produto.feminino ? "feminino" : "masculino"}" >
        <div class="imagem">
            <img src="/assets/img/${produto.imagem}" alt="Imagem produto ${produto.id}">
        </div>
        <div class="description">
            <p class="name">${produto.nome}</p>
            <p class="brand">${produto.marca}</p>
            <p class="price">$${produto.preco}</p>
        </div>
        <div class="comprar">
            <button id="adicionar-${produto.id}">Adicionar ao carrinho</button>
        </div>
        </div>`;
  
        document.querySelector("#container-produtos").innerHTML += cardProduto;
    });
  
    catalogo.forEach((produto) => {
        document.getElementById(`adicionar-${produto.id}`).addEventListener("click", () => adicionarAoCarrinho(produto.id))
    })
}