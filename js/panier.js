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
                    <a href= "#" class="quantity-down"><i class="fas fa-arrow-left"></i></a>
                    <span>${item.quantity}</span>
                    <a href= "#" class="quantity-up"><i class="fas fa-arrow-right"></i></a>
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

function purshase() {
    document.getElementById('confirmPurshase').onclick = () =>{
        sendOrder();
    }
    
    watchValidity(document.getElementById('firstName'), (e) => e.target.value.length > 1);
    watchValidity(document.getElementById('lastName'), (e) => e.target.value.length > 1);
    watchValidity(document.getElementById('email'), (e) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return emailRegex.test(e.target.value)
    });
    watchValidity(document.getElementById('adress'), (e) => e.target.value.length > 6)
    watchValidity(document.getElementById('postalCode'), (e) => {
        const postalCodeRegex = /[0-9]{5}(-[0-9]{4})?/
        return postalCodeRegex.test(e.target.value)
    })
    watchValidity(document.getElementById('city'), (e) => e.target.value.length > 1)
}

purshase();

function watchValidity(e, condition) {
    e.oninput = (e) => {
      if (condition(e)) {
        validInput(e.target)
      } else {
        neutralInput(e.target)
      }
    }
  
    e.onblur = (e) => {
      if (!condition(e)) {
        invalidInput(e.target)
      }
    }
  }
  
  function validInput(e) {
    e.style.border = 'solid 1px green'
    e.style.boxShadow = '#00800066 0px 0px 4px'
  }
  
  function invalidInput(e) {
    e.style.border = 'solid 1px red'
    e.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
  }
  
  function neutralInput(e) {
    e.style.border = ''
    e.style.boxShadow = ''
  }


// Envoie de la commande //

function sendOrder() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const adress = document.getElementById('adress').value;
    const postalCode = document.getElementById('postalCode').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const postalCodeRegex = /[0-9]{5}(-[0-9]{4})?/;

    if(!(firstname.length > 1 && lastname.length > 1 && emailRegex.test(email) && adress.length > 6 && postalCodeRegex.test(postalCode) && city.length > 1)){
        alert("Veuillez remplir les champs correstements avant de payer votre commande !")
        return
    };

    const products = Object.values(cardItems).map((product) =>{
        return product._id
    });

    const order = {
        contact: {
            firstName: firstname,
            lastName: lastname,
            address: adress + '' + postalCode,
            city: city,
            email: email,
        },
        products: products,
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        header: {'Content-Type': 'application/json; charset=utf-8'},
    };

    fetch('http://localhost:3000/api/teddies/order', requestOptions)
    .then((res) => res.json())
    .then((json) =>{
        console.log(json);
        localStorage.removeItem('differentProduct')
        window.location.href = `confirmation.html?orderId=${json.orderId}`
    })
    .catch(() =>{
        alert(error)
    });
};


























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



     