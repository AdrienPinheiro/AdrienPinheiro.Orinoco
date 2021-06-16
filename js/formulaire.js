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