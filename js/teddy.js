let cardArticles = null;
let dataTeddies = null;

function updateTeddies(){
    fetch('http://localhost:3000/api/teddies')
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

function drawTeddy(teddies){
    teddies.forEach(function(teddy){

        let input = document.getElementById("id").value;

        if(teddy._id == input){
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
            cardPrice.innerHTML = `Prix :${teddy.price}`;
        
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
        } else {
            console.log("Error id");
        }
    })
}

window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.card-articles')
    updateTeddies();
},false);