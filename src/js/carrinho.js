import { catalogo, lerLocalStorage, salvarNaLocalStorage } from "./utilidades";
const carrinho = document.getElementById("carrinho");
const iconeAbrirCarrinho = document.querySelector("#carrinho-icon i");
const iconeFecharCarrinho = document.querySelector(".fa-solid.fa-x");
const background = document.getElementById("background");

const idProdutoCarrinhoEQuantidade = lerLocalStorage("produtos") ?? {};

const abrirCarrinho = () => {
    carrinho.style.right = '0%';
    background.style.display = "block";
}

const fecharCarrinho = () => {
    carrinho.style.right = "-100%";
    background.style.display = "none";
}

const irParaCheckout = () => {
  if(Object.keys(idProdutoCarrinhoEQuantidade).length === 0) {
    return;
  }
  window.location.href = window.location.origin + "/src/paginas/checkout.html";
}

export const funcionalidadesCarrinho = () => {
    iconeAbrirCarrinho.addEventListener("click", abrirCarrinho);
    iconeFecharCarrinho.addEventListener("click", fecharCarrinho);
    background.addEventListener("click", fecharCarrinho);
    document.querySelector("#finalizar-compra button").addEventListener("click", irParaCheckout)   
}

const incrementarQuantidadeProduto = (idProduto) => {
  idProdutoCarrinhoEQuantidade[idProduto]++;
  atualizarQuantidade(idProduto);
  atualizarPrecoCarrinho();
  salvarNaLocalStorage("produtos", idProdutoCarrinhoEQuantidade);
}

const decrementarQuantidadeProduto = (idProduto) => {
  if(idProdutoCarrinhoEQuantidade[idProduto] === 1) {
    removerProdutoDoCarrinho(idProduto);
    return;
  }
  idProdutoCarrinhoEQuantidade[idProduto]--;
  atualizarQuantidade(idProduto);
  atualizarPrecoCarrinho();
  salvarNaLocalStorage("produtos", idProdutoCarrinhoEQuantidade);
}

const atualizarQuantidade = (idProduto) => {
  document.getElementById(`quantidade-${idProduto}`).innerText = `${idProdutoCarrinhoEQuantidade[idProduto]}`
}

function atualizarPrecoCarrinho() {
  const informacaoPreco = document.getElementById("preco-total");
  let precoTotal = 0;
  for(const idProduto in idProdutoCarrinhoEQuantidade) {
    precoTotal += catalogo.find((p) => p.id === idProduto).preco * idProdutoCarrinhoEQuantidade[idProduto];
  }

  informacaoPreco.innerHTML = `Total: <span>$${precoTotal}</span>`;
}
 
export function adicionarAoCarrinho(idProduto) {
    if(idProduto in idProdutoCarrinhoEQuantidade) {
      incrementarQuantidadeProduto(idProduto);
      return;
    }

    idProdutoCarrinhoEQuantidade[idProduto] = 1;
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
    salvarNaLocalStorage("produtos", idProdutoCarrinhoEQuantidade)
}

const removerProdutoDoCarrinho = (idProduto) => {
  delete idProdutoCarrinhoEQuantidade[idProduto];
  renderizarCarrinho();
  salvarNaLocalStorage("produtos", idProdutoCarrinhoEQuantidade);
}

const desenharProdutoNoCarrinho = (idProduto) => {
  const produto = catalogo.find((p) => p.id === idProduto);
  const cardProdutoCarrinho = document.createElement("article");
  
  cardProdutoCarrinho.innerHTML = `
    <button class="apagar-produto" id="deletar-${produto.id}">
      <i class="fa-solid fa-circle-xmark"></i>
    </button>
    <img src="/assets/img/${produto.imagem}" alt="Imagem produto 1">
    <div class="info">
      <p>${produto.nome}</p>
      <p>$${produto.preco}</p>
    </div>
    <div class="quantidade">
      <button id="decrementar-${produto.id}"><i class="fa-solid fa-minus"></i></button>
      <p id="quantidade-${produto.id}">${idProdutoCarrinhoEQuantidade[produto.id]}</p>
      <button id="incrementar-${produto.id}"><i class="fa-solid fa-plus"></i></button>
    </div>`;

  document.getElementById("carrinho-conteudo").appendChild(cardProdutoCarrinho);

  document.getElementById(`incrementar-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
  document.getElementById(`decrementar-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));
  document.getElementById(`deletar-${produto.id}`).addEventListener("click", () => removerProdutoDoCarrinho(produto.id))
}


export function renderizarCarrinho() {
  const containerProdutosCarrinho = document.getElementById("carrinho-conteudo");
  containerProdutosCarrinho.innerHTML = ""
  for (const idProduto in idProdutoCarrinhoEQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
  atualizarPrecoCarrinho();
}