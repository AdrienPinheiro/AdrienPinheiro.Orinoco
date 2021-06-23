let cardArticles = null;
let dataTeddies = null;

function updateTeddies(){
    fetch("http://localhost:3000/api/teddies")
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            dataTeddies = data;
            drawTeddies(data);
            panier(data);
     })
    .catch(function(error){
        console.error(error);
    })
}

function drawTeddies(teddies) {
    teddies.forEach(function (teddy) {
        let cardTeddy = document.createElement("div");
        cardTeddy.setAttribute("class", "card-article");

        let cardLink = document.createElement("a");
        cardLink.setAttribute("class", "teddy")
        cardLink.setAttribute("href", "teddy.html?id=" + teddy._id);
        cardTeddy.append(cardLink);

        let cardDescrition = document.createElement("div");
        cardDescrition.setAttribute("class", "card-description");

        let cardImg = document.createElement("img");
        cardImg.setAttribute("src", teddy.imageUrl);
        cardImg.setAttribute("class", "card-img");
        cardLink.append(cardImg, cardDescrition);

        let cardName = document.createElement("h3");
        cardName.setAttribute("class", "card-name");
        cardName.innerHTML = teddy.name;

        let cardPrice = document.createElement("p")
        cardPrice.setAttribute("class", "card-price");
        cardPrice.innerHTML = `Prix:${new Intl.NumberFormat("de-DE", { style:"currency", currency: "EUR", minimumFractionDigits: 2}).format(teddy.price/100)}`;

        let cardRow = document.createElement("div");
        cardRow.setAttribute("class", "cardRow");

        let cardColor = document.createElement("div");
        cardColor.setAttribute("class", "card-color");
        cardColor.innerHTML = `<p>Coloris:</p>`;

        let cardAdd = document.createElement("a");
        cardAdd.setAttribute("class", "card-add");
        cardAdd.setAttribute("href", "#")
        cardAdd.innerHTML = `Ajouter`;
        cardDescrition.append(cardName, cardPrice, cardRow);
        cardRow.append(cardColor, cardAdd);

        const teddyColors = teddy.colors;

        for(i = 0; i < teddyColors.length; i++){
        let teddyColor = document.createElement("div");
        teddyColor.setAttribute("class", teddyColors[i]);
        cardColor.append(teddyColor);}
  
        cardArticles.append(cardTeddy);
    })
}

function panier(product){
    let add = document.querySelectorAll('.card-add');

    for(let i = 0; i < add.length; i++){
        add[i].addEventListener("click", () =>{
            addProduct(product[i]);
        })
    }
}

window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.card-articles')
    updateTeddies();
},false);



