import { desenharProduto, lerLocalStorage } from "./utilidades";

function criarPedidoHistorico(pedidoComData) {
    const elementoPedido = `
    <p class="data">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {hour: "2-digit",minute: "2-digit",})}</p>
    <section id="container-pedidos-${pedidoComData.dataPedido}" class="pedido"></section>`;

    document.querySelector("main").innerHTML += elementoPedido;
  
    for (const idProduto in pedidoComData.pedido) {
      desenharProduto(
        idProduto,
        `container-pedidos-${pedidoComData.dataPedido}`,
        pedidoComData.pedido[idProduto]
      );
    }
}
  
function renderizarHistorico() {
    const historico = lerLocalStorage("historico");
    for (const pedidoComData of historico) {
      criarPedidoHistorico(pedidoComData);
    }
}

document.getElementById("logo").addEventListener("click", () => {
  window.location.href = window.location.origin + "/";
});

renderizarHistorico();