let add = null;
let cartNumberProduct = null;
let panierTotal = null;

function onLoad(){
    add = document.querySelectorAll(".card-add");
    cartNumberProduct = document.querySelector(".panier span");
    panierTotal = document.getElementById("panierTotal");

    let productNumbers = localStorage.getItem("numberProduct");

    if(productNumbers){
        cartNumberProduct.textContent = productNumbers;
    }
    productCard();
}

function addProduct(product, quantity = 1){
    let cardItems = localStorage.getItem("differentProduct");

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

function removeProduct(productId) {
    let products = JSON.parse(localStorage.getItem("differentProduct"));
    delete products[productId];
    localStorage.setItem("differentProduct", JSON.stringify(products));

    productCard();
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
    let formatedTotal = new Intl.NumberFormat("de-DE", { style:"currency", currency: "EUR", minimumFractionDigits: 2}).format(total/100)
    localStorage.setItem("total", formatedTotal);
    localStorage.setItem("numberProduct", numberProduct);
    cartNumberProduct.textContent = numberProduct;
    if(panierTotal){
        panierTotal.innerHTML = formatedTotal;
    }
}

function productCard(){

    let cardItems = localStorage.getItem("differentProduct");
    cardItems = JSON.parse(cardItems);
    let cardPrice = localStorage.getItem("total");

    let productsContainer = document.querySelector(".products");

    if(cardItems && productsContainer){
        productsContainer.innerHTML =``
        Object.values(cardItems).map(item =>{
            productsContainer.innerHTML += `
            <div class= "product">
                <div class="cardImg">
                    <i class="fas fa-times-circle remove-product" data-product-id="${item._id}"></i>
                    <img src="${item.imageUrl}">
                    <span>${item.name}</span>
                </div>
                <div class="price">${new Intl.NumberFormat("de-DE", { style:"currency", currency: "EUR", minimumFractionDigits: 2}).format(item.price/100)}</div>
                <div class= "quantity">
                    <span>${item.quantity}</span>
                </div>
                <div class="total">
                    ${new Intl.NumberFormat('de-DE', { style:'currency', currency: 'EUR', minimumFractionDigits: 2}).format(item.quantity * item.price/100)}
                </div>
            </div>
            `; 
        });

        panierTotal.innerHTML = cardPrice;
        
        for(let btn of document.getElementsByClassName("remove-product")){
            btn.addEventListener('click', (e)=>{
                let productId = e.target.getAttribute("data-product-id");
                removeProduct(productId);
            })
        } 
    }
}


function removeOnCart() {
    
   /* e.addEventListener('click', () =>{
        let productId = e.getAttribute("attribut");
        delete localStorage.differentProduct[productId];
        //localStorage.removeItem(productId);
    })*/

    let removeCart = document.getElementsByClassName("remove")

    for(let i of removeCart){
        console.log('Youplo');
        i.addEventListener('click', () =>{
            let productId = i.getAttribute("attribut");
            console.log(productId);
            //delete localStorage.differentProduct[productId];
            localStorage.removeItem("differentProduct", productId);
            localStorage.getItem('NumberProduct') 
            localStorage.getItem('total')
        })
    }
}

window.addEventListener("DOMContentLoaded", onLoad, false);