export const catalogo = [
      {
        id: "1",
        marca: "Zara",
        nome: "Camisa Larga com Bolsos",
        preco: 70,
        imagem: "product-1.jpg",
        feminino: false,
      },
      {
        id: "2",
        marca: "Zara",
        nome: "Casaco Reto com Lã",
        preco: 85,
        imagem: "product-2.jpg",
        feminino: true,
      },
      {
        id: "3",
        marca: "Zara",
        nome: "Jaqueta com Efeito Camurça",
        preco: 60,
        imagem: "product-3.jpg",
        feminino: false,
      },
      {
        id: "4",
        marca: "Zara",
        nome: "Blazer com Cinto com Linho",
        imagem: "product-12.jpg",
        preco: 180,
        feminino: true,
      },
      {
        id: "5",
        marca: "Zara",
        nome: "Camisa 100% linho",
        preco: 110,
        imagem: "product-5.jpg",
        feminino: false,
      },
      {
        id: "6",
        marca: "Zara",
        nome: "Casaco de Lã com Botões",
        preco: 170,
        imagem: "product-6.jpg",
        feminino: true,
      },
      {
        id: "7",
        marca: "Zara",
        nome: "Casaco com Botões",
        preco: 75,
        imagem: "product-7.jpg",
        feminino: true,
      },
      {
        id: "8",
        marca: "Zara",
        nome: "Colete Comprido com Cinto",
        preco: 88,
        imagem: "product-8.jpg",
        feminino: true,
      },
      {
        id: "9",
        marca: "Zara",
        nome: "Blazer de terno 100% Lã",
        imagem: "product-9.jpg",
        preco: 199,
        feminino: false,
      },
      {
        id: "10",
        marca: "Zara",
        nome: "Jaqueta Denim com Cinto",
        imagem: "product-10.jpg",
        preco: 140,
        feminino: true,
      },
      {
        id: "11",
        marca: "Zara",
        nome: "Sobretudo em Mescla de Lã",
        imagem: "product-11.jpg",
        preco: 145,
        feminino: false,
      },
      {
        id: "12",
        marca: "Zara",
        nome: "Sobretudo em Mescla de Lã",
        preco: 160,
        imagem: "product-4.jpg",
        feminino: false,
      }
]

export const salvarNaLocalStorage = (chave, valor) => {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export const lerLocalStorage = (chave) => {
  return JSON.parse(localStorage.getItem(chave));
}

export const desenharProduto = (idProduto, idContainer, quantidade) => {
  const produto = catalogo.find((p) => p.id === idProduto);
  const cardProdutoCarrinho = document.createElement("article");
  
  cardProdutoCarrinho.innerHTML = `
    <img src="/assets/img/${produto.imagem}" alt="Imagem produto ${produto.id}">
    <div class="info">
      <p>${produto.nome}</p>
      <p>$${produto.preco}</p>
    </div>
    <div class="quantidade">
      <p id="quantidade-${produto.id}">${quantidade}</p>
    </div>`;

  document.getElementById(idContainer).appendChild(cardProdutoCarrinho);
}