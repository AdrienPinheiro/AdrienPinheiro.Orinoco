let add = null;
let cartNumberProduct = null;

function onLoad(){
    add = document.querySelectorAll('.card-add');
    cartNumberProduct = document.querySelector('.panier span');

    let productNumbers = localStorage.getItem('numberProduct');

    if(productNumbers){
        cartNumberProduct.textContent = productNumbers;
    }
    productCard();
} 

function addProduct(product, quantity = 1){
    let cardItems = localStorage.getItem('differentProduct');

    cardItems = JSON.parse(cardItems);

    if (cardItems != null){
        if(cardItems[product._id] == undefined){
            product.quantity = 0;
            cardItems = {
                ...cardItems,
                [product._id]: product,
            }
        }
        cardItems[product._id].quantity += quantity;
    } else {
        product.quantity = quantity;
        cardItems = {
            [product._id]: product
        }
    }
    localStorage.setItem("differentProduct", JSON.stringify(cardItems));
    computeCartAttr();
}

function computeCartAttr(){
    let products = JSON.parse(localStorage.getItem("differentProduct"));
    let total = 0;
    let numberProduct = 0;

    Object.values(products).map(product => {
        total += product.price * product.quantity;
        numberProduct += product.quantity;
    })
    localStorage.setItem("total", new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(total/100));
    localStorage.setItem('numberProduct', numberProduct);
    cartNumberProduct.textContent = numberProduct;
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
            <div class= "product">
                <div class="cardImg">
                    <i class="fas fa-times-circle remove-cart"></i>
                    <img src="${item.imageUrl}">
                    <span>${item.name}</span>
                </div>  
                <div class="price">${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(item.price/100)}</div>
                <div class= "quantity">
                    <span>${item.quantity}</span>
                </div>
                <div class="total">
                    ${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(item.quantity * item.price/100)}
                </div>
            </div>
            `;
        });

        productsContainer.innerHTML += `
            <div class= "panierTotalContainer">
                <h4 class="panierTotalTitle">
                    Total:
                </h4>
                <h4 class="panierTotal">
                    ${cardPrice}
                </h4>
            </div>
        `
    }

// Vérification de la validité du formulaire //




























/*    let removeCart = document.getElementsByClassName('remove-cart')

    for(let i = 0; i < removeCart.length; i++){
        let button = removeCart[i];
        button.addEventListener('click', function (e) {
            let cardItems = localStorage.getItem('differentProduct', JSON.stringify(cardItems));
            let buttonClicked = event.target;
            buttonClicked.cardItems[i].remove()
        })
    }

    let quantityUp = document.querySelector('.quantity-up');
    let quantityDown = document.querySelector('.quantity-down');

    quantityUp.addEventListener('click',  Object.values(cardItems).map(item =>{
        let cardItems = localStorage.getItem('differentProduct');
        cardItems = JSON.parse(cardItems);

         item.quantity += 1;
    }))
    
    quantityDown.addEventListener('click', () =>{
        let cardItems = localStorage.getItem('differentProduct');

    }) */
    
}

window.addEventListener("DOMContentLoaded", onLoad, false);



     