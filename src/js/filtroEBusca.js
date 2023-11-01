export const funcionalidadesFiltro = () => {
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

export const funcionalidadesBusca = () => {

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
        /*
        if(opcao === "men") {
            card.classList.contains("feminino") ? card.style.display = "none" : card.style.display = "flex";
        } else if (opcao === "women") {
            card.classList.contains("masculino") ? card.style.display = "none" : card.style.display = "flex";   
        } else if (opcao === "all") {
            card.style.display = "flex";  
        } 
        */