import { catalogo, desenharProduto, lerLocalStorage, salvarNaLocalStorage } from "./utilidades";
const idProdutoCarrinhoEQuantidade = lerLocalStorage("produtos");

const renderizarProdutosCheckout = () => {
    for(const idProduto in idProdutoCarrinhoEQuantidade) {
        desenharProduto(idProduto, "container-produtos-checkout", idProdutoCarrinhoEQuantidade[idProduto])
    }
}

const atualizarPrecoCheckout = () => {
  let precoTotal = 0;
  for(const idProduto in idProdutoCarrinhoEQuantidade) {
    precoTotal += catalogo.find((p) => p.id === idProduto).preco * idProdutoCarrinhoEQuantidade[idProduto];
  }

  document.getElementById("preco-total").innerHTML = `Total: <span>$${precoTotal}</span>`;
}

function validarTelefone(texto) {
  return texto.replace(/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/, "");
}

document.getElementById("telefone").addEventListener("input", (e) => {
  const valorValidado = validarTelefone(e.target.value)

  e.target.value = valorValidado
})

const finalizarCompra = (e) => {
  e.preventDefault();

  const idProdutoCarrinhoEQuantidade = lerLocalStorage("produtos") ?? {};
  if(Object.keys(idProdutoCarrinhoEQuantidade).length === 0) {
    return;
  };

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idProdutoCarrinhoEQuantidade
  }

  const historicoDeCompras = lerLocalStorage("historico") ?? [];
  const historicoDeComprasAtualizado = [pedidoFeito, ... historicoDeCompras];

  salvarNaLocalStorage("historico", historicoDeComprasAtualizado);
  apagarDoLocalStorage("produtos");

  window.location.href = window.location.origin + "/src/paginas/pedidos.html";
};

document.getElementById("formulario-compra").addEventListener("submit", (e) => finalizarCompra(e));

export const apagarDoLocalStorage = (chave) => {
  localStorage.removeItem(chave)
}

document.getElementById("logo").addEventListener("click", () => {
  window.location.href = window.location.origin + "/";
});

atualizarPrecoCheckout();
renderizarProdutosCheckout();