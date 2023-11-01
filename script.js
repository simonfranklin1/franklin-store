const catalogo = [
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

const renderizarCatalogo = () => {
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

const salvarNaLocalStorage = (chave, valor) => {
localStorage.setItem(chave, JSON.stringify(valor));
}

const lerLocalStorage = (chave) => {
return JSON.parse(localStorage.getItem(chave));
}

const desenharProduto = (idProduto, idContainer, quantidade) => {
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

const funcionalidadesCarrinho = () => {
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
 
function adicionarAoCarrinho(idProduto) {
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


function renderizarCarrinho() {
  const containerProdutosCarrinho = document.getElementById("carrinho-conteudo");
  containerProdutosCarrinho.innerHTML = ""
  for (const idProduto in idProdutoCarrinhoEQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
  atualizarPrecoCarrinho();
}

const funcionalidadesFiltro = () => {
    document.getElementById("filtro").addEventListener("change", (e) => {
        let opcao = e.target.value;

        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {
            
            switch(opcao) {
                case "men":
                    card.classList.contains("feminino") ? card.style.display = "none" : card.style.display = "flex";
                    break;
                case "women":
                    card.classList.contains("masculino") ? card.style.display = "none" : card.style.display = "flex";
                    break;
                case "all":
                    card.style.display = "flex";
                    break;
                default:
                    break;
            }
              
        })   
    })
}

const funcionalidadesBusca = () => {

    const buscarValor = (text) => {
        let cards
        const valordoFiltro = document.getElementById("filtro").value;

        switch(valordoFiltro) {
            case "men": 
                cards = document.querySelectorAll(".masculino");
                break;
            case "women":
                cards = document.querySelectorAll(".feminino");
                break;
            case "all":
                cards = document.querySelectorAll(".card");
                break;
            default:
                break;
        }

        cards.forEach((card) => {
            card.style.display = "flex";
            card.style.animation = "aparecer .5s";
            const titulo = card.querySelector(".name").innerText.toLowerCase();

            const buscaNormalizada = text.toLowerCase();

            if(!titulo.includes(buscaNormalizada)) {
                card.style.display = "none";
            }
        });
    };

    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("keyup", (e) => {
        const busca = e.target.value;

        buscarValor(busca);
    });
}

renderizarCatalogo();
funcionalidadesCarrinho();
renderizarCarrinho();
funcionalidadesBusca();
funcionalidadesFiltro();