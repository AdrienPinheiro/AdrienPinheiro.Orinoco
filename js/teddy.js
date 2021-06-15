let cardArticles = null;
let dataTeddies = null;

function updateTeddy(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    fetch('http://localhost:3000/api/teddies/' + id)
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
    cardPrice.innerHTML = `Prix : ${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(teddy.price/100)}`;

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
    cardColor.append(selectColor);

    const teddyColors = teddy.colors;

    for(i = 0; i < teddyColors.length; i++){
    let teddyColor = document.createElement("option");
    teddyColor.value = teddyColors.length; // a chercher
    teddyColor.setAttribute("class", teddyColors[i]); // petit prob sur certain
    teddyColor.label = teddy.colors[i];
    selectColor.append(teddyColor);
    }

    let selectNumber = document.createElement('input');
    selectNumber.setAttribute('class', 'style');
    selectNumber.setAttribute('id', 'number-teddy');
    selectNumber.setAttribute('type', 'text');
    selectNumber.setAttribute('class', 'select-number');
    cartNumber.append(selectNumber);

    cardArticles.append(cardTeddy);
}

function panier(product){
    let add = document.querySelectorAll('.teddy-add');
    

    for(let i = 0; i < add.length; i++){
        add[i].addEventListener("click", () =>{
            setItems(product);
            cardNumbers(product);
            total(product);
        })
    }

    function cardNumbers(product){
        let productNumbers = localStorage.getItem('cardNumbers');

        productNumbers = parseInt(productNumbers);

        if(productNumbers){
            localStorage.setItem('cardNumbers', productNumbers + 1);
            document.querySelector('.panier span').textContent = productNumbers + 1;            
        } else {
            localStorage.setItem('cardNumbers', 1);
            document.querySelector('.panier span').textContent = 1;            
        }
    }

    function onLoad(){
        let productNumbers = localStorage.getItem('cardNumbers');

        if(productNumbers){
            document.querySelector('.panier span').textContent = productNumbers;
        }
    } 

    function setItems(product){
        let cardItems = localStorage.getItem('differentProduct');

        cardItems = JSON.parse(cardItems);

        if (cardItems != null){
            if(cardItems[product.name] == undefined){
                product.inCart = 0;
                cardItems = {
                    ...cardItems,
                    [product.name]: product,
                }
            }
            cardItems[product.name].inCart += 1;
        } else {
            product.inCart = 1;
            cardItems = {
                [product.name]: product
            }
        }
        localStorage.setItem("differentProduct", JSON.stringify(cardItems));
    }

    function total(product){
        let cardPrice = localStorage.getItem("total");

        if(cardPrice != null){
            cardPrice = parseInt(cardPrice);
            localStorage.setItem("total", new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(cardPrice + product.price/100));
        } else {
            localStorage.setItem("total", new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(product.price/100));
        }

    }

    onLoad();
}

window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.teddy-card-articles')
    updateTeddy();
},false);