let cardArticles = null;
let dataTeddies = null;

function updateTeddy(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    fetch("http://localhost:3000/api/teddies/" + id)
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            dataTeddies = data;
            drawTeddy(data);
            panier(data);
     })
    .catch(function(error){
        console.error(error);
    })
}


function drawTeddy(teddy){

    let cardTeddy = document.createElement("div");
    cardTeddy.setAttribute("class", "teddy-card-article");

    let cardDescriptif = document.createElement("div");
    cardDescriptif.setAttribute("class", "teddy-card-descriptif");

    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", teddy.imageUrl);
    cardImg.setAttribute("class", "teddy-card-img");
    cardTeddy.append(cardImg, cardDescriptif);

    let cardName = document.createElement("h3");
    cardName.setAttribute("class", "teddy-card-name");
    cardName.innerHTML = teddy.name;

    let cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "teddy-card-description");
    cardDescription.innerHTML = teddy.description;

    let cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "teddy-card-price");
    cardPrice.innerHTML = `Prix : ${new Intl.NumberFormat("de-DE", { style:"currency", currency: "EUR", minimumFractionDigits: 2}).format(teddy.price/100)}`;

    let cardColor = document.createElement("form");
    cardColor.setAttribute('action', "#");
    cardColor.setAttribute("class", "teddy-card-color");
    cardColor.innerHTML = `<p>Coloris:</p>`;

    let cartNumber = document.createElement('form');
    cartNumber.setAttribute('action', '#');
    cartNumber.setAttribute("class", "teddy-card-number");
    cartNumber.innerHTML = `<p>Quantité:</p>`;

    let cardAdd = document.createElement("a");
    cardAdd.setAttribute("class", "teddy-add");
    cardAdd.setAttribute("href", "#")
    cardAdd.innerHTML = `Ajouter`;
    cardDescriptif.append(cardName, cardDescription, cardPrice, cardColor, cartNumber, cardAdd);

    let selectColor = document.createElement('select');
    selectColor.setAttribute('class', 'select-color');
    selectColor.size = 4;

    let selectColorName = document.createElement('div');
    selectColorName.setAttribute('class', 'select-color-name');
    cardColor.append(selectColor, selectColorName);

    const teddyColors = teddy.colors;

    for(i = 0; i < teddyColors.length; i++){
        let teddyColor = document.createElement("option");
        let teddyColorName = document.createElement("p");

        teddyColor.value = teddyColors.length; // a chercher
        teddyColor.setAttribute("class", teddyColors[i]); // petit prob sur certain
        selectColor.append(teddyColor);
        
        teddyColorName.innerHTML = `:${teddy.colors[i]}`;
        selectColorName.append(teddyColorName);
    }

    let selectNumber = document.createElement('input');
    selectNumber.setAttribute('id', 'select-number');
    selectNumber.setAttribute('type', 'number');
    selectNumber.setAttribute('min', '1');
    cartNumber.append(selectNumber);

    cardArticles.append(cardTeddy);
}

function panier(product){
    let add = document.querySelectorAll('.teddy-add');

    for(let i = 0; i < add.length; i++){
        add[i].addEventListener("click", () =>{
            let quantity = parseInt(document.getElementById('select-number').value);

            if(quantity > 0 && Number.isInteger(quantity) == true){
                addProduct(product, quantity);  
            } else {
                alert("Veuillez remplir avec un chiffre positif !")
            }
        })
    }
}

window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.teddy-card-articles')
    updateTeddy();
},false);