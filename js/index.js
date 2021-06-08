let cardArticles = null;
let dataTeddies = null;

function updateTeddies(){
    fetch('http://localhost:3000/api/teddies')
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
        
        let cardAdd = document.createElement("a");
        cardAdd.setAttribute("class", "card-add");
        cardAdd.setAttribute("href", "#")
        cardAdd.innerHTML = `Ajouter`;
        cardTeddy.append(cardLink, cardAdd);

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
        cardPrice.innerHTML = `Prix : ${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(teddy.price/100)}`;

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

function panier(product){
    let add = document.querySelectorAll('.card-add');

    for(let i = 0; i < add.length; i++){
        add[i].addEventListener("click", () =>{
            cardNumbers(product[i]);
            total(product[i]);
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
        setItems(product);
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
                cardItems = {
                    ...cardItems,
                    [product.name]: product
                }
            }
            cardItems[product.name].inCard += 1;
        } else {
            product.inCard = 1;
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

    function productCard(){

        let cardItems = localStorage.getItem('differentProduct');
        cardItems = JSON.parse(cardItems);
        let cardPrice = localStorage.getItem("total");

        let productsContainer = document.querySelector(".products");

        if(cardItems && productsContainer){
            productsContainer.innerHTML =``
            Object.values(cardItems).map(item =>{
                productsContainer.innerHTML += `
                <div class="product">
                    <i class="fas fa-times-circle"></i>
                    <img src="${item.imageUrl}">
                    <span>${item.name}</span>
                </div>  
                <div class="price">${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(item.price/100)}</div>
                <div class= "quantity>
                <i class="fas fa-arrow-left"></i
                    <span>${item.inCard}</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
                <div class="total">
                    ${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(item.inCard * item.price/100)}
                </div>
                `;
            });

            productsContainer.innerHTML += `
                <div class= "panierTotalContainer">
                    <h4 class="panierTotalTitle">
                        Total
                    </h4>
                    <h4 class="panierTotal">
                        ${cardPrice}
                    </h4>
                </div>
            `
        }
        
    }

    onLoad();
    productCard();
}



window.addEventListener("DOMContentLoaded", function (){
    cardArticles = document.querySelector('.card-articles')
    updateTeddies();
},false);



