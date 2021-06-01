let cardArticles = null;
let dataTeddies = null;


function updateTeddies(){
    fetch('http://localhost:3000/api/teddies')
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            dataTeddies = data;    
            drawTeddies(data);    
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
        cardLink.setAttribute("href", "/html/" + teddy._id + ".html");
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
        cardPrice.innerHTML = `Prix :${teddy.price}`;

        let cardColor = document.createElement("div");
        cardColor.setAttribute("class", "card-color");
        cardColor.innerHTML = `<p>Coloris:</p>`;
        cardDescrition.append(cardName, cardPrice, cardColor);

        const teddyColors = teddy.colors;

        for(i = 0; i < teddyColors.length; i++){
        let teddyColor = document.createElement("div");
        teddyColor.setAttribute("class", teddyColors[i]);
        cardColor.append(teddyColor);}
                
        cardArticles.append(cardTeddy);
    })
}

window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.card-articles')
    updateTeddies();
},false);
