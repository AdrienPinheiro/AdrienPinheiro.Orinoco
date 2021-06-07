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
     })
    .catch(function(error){
        console.error(error);
    }) 
}

function drawTeddy(teddy){

    let cardTeddy = document.createElement("div");
    cardTeddy.setAttribute("class", "teddy-card-article");
        
    let cardDescription = document.createElement("div");
    cardDescription.setAttribute("class", "teddy-card-description");
        
    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", teddy.imageUrl);
    cardImg.setAttribute("class", "teddy-card-img");
    cardTeddy.append(cardImg, cardDescription);
        
    let cardName = document.createElement("h3");
    cardName.setAttribute("class", "teddy-card-name");
    cardName.innerHTML = teddy.name;

    let cardPrice = document.createElement("p")
    cardPrice.setAttribute("class", "teddy-card-price");
    cardPrice.innerHTML = `Prix : ${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(teddy.price/100)}`;

    let cardColor = document.createElement("div");
    cardColor.setAttribute("class", "teddy-card-color");
    cardColor.innerHTML = `<p>Coloris:</p>`;
    cardDescription.append(cardName, cardPrice, cardColor);

    const teddyColors = teddy.colors;

    for(i = 0; i < teddyColors.length; i++){
    let teddyColor = document.createElement("div");
    teddyColor.setAttribute("class", teddyColors[i]);
    cardColor.append(teddyColor);}
        
    cardArticles.append(cardTeddy);     
}

window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.teddy-card-articles')
    updateTeddy();
},false);