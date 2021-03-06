// Donne un coté visuel pour la validité du formulaire suivant des conditions
// Permet de lancer la fonction sendOrder qui envoie les données du panier et du formulaire

function purshase() {
    document.getElementById("confirmPurshase").onclick = (e) =>{
        sendOrder(e);
        e.preventDefault();
    }

    watchValidity(document.getElementById("firstName"), (e) => e.target.value.length > 1);
    watchValidity(document.getElementById("lastName"), (e) => e.target.value.length > 1);
    watchValidity(document.getElementById("email"), (e) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return emailRegex.test(e.target.value)
    });
    watchValidity(document.getElementById("adress"), (e) => e.target.value.length > 6)
    watchValidity(document.getElementById("postalCode"), (e) => {
        const postalCodeRegex = /[0-9]{5}(-[0-9]{4})?/
        return postalCodeRegex.test(e.target.value)
    })
    watchValidity(document.getElementById("city"), (e) => e.target.value.length > 1)
}

// Visuel pour la validité du formulaire

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
    e.style.border = "solid 1px green"
    e.style.boxShadow = "#00800066 0px 0px 4px"
  }

  function invalidInput(e) {
    e.style.border = "solid 1px red"
    e.style.boxShadow = "rgba(128, 0, 0, 0.4) 0px 0px 4px"
  }

  function neutralInput(e) {
    e.style.border = ""
    e.style.boxShadow = ""
  }


// Vérification des données du formulaire et du panier
// Construction du tableau à envoyer à l'api
// Envoie des données à l'api

function sendOrder(e) {
    const firstname = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const adress = document.getElementById("adress").value;
    const postalCode = document.getElementById("postalCode").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;
    let cardItems = localStorage.getItem("differentProduct");
    cardItems = JSON.parse(cardItems);

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const postalCodeRegex = /[0-9]{5}(-[0-9]{4})?/;

    if(!(firstname.length > 1 && lastname.length > 1 && emailRegex.test(email) && adress.length > 6 && postalCodeRegex.test(postalCode) && city.length > 1)){
        alert("Veuillez remplir les champs correctements avant de payer votre commande !")
        e.preventDefault();
        return
    };

    if(cardItems == null){
      alert("Veuillez choisir des articles pour la commande.")
      e.preventDefault();
      return
    }

    const products = []

    for(let id in cardItems){
      products.push(id)
    }

  console.log(products);

    const order = {
        contact: {
            firstName: firstname,
            lastName: lastname,
            address: adress + postalCode,
            city: city,
            email: email,
        },
        products: products,
    };

    const requestOptions = {
        method: "POST",
        headers: new Headers({
          "Accept": "application/json", 
          "Content-Type": "application/json; charset=utf-8"}),
        body: JSON.stringify(order)
    }

    fetch("http://localhost:3000/api/teddies/order", requestOptions)
    .then((res) => {
      res.json().then(function (json) {
        console.log(json);
        localStorage.removeItem("differentProduct");
        localStorage.removeItem("numberProduct");
        localStorage.removeItem("total");
        window.location.href = `http://127.0.0.1:5500/front-end/confirmation.html?orderId=${json.orderId}`
    });
    })
    .catch(function(error){
      console.error(error);
  })
};

// Attend que la page html soit chargé avant de lancer une fonction

window.addEventListener("DOMContentLoaded", function (){
  purshase();
},false);
