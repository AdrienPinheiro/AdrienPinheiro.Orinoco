window.addEventListener("DOMContentLoaded", function (){
    const bouton = document.querySelector(".research-category")
    const column = document.querySelector(".column")
    const category = document.querySelector(".category")
    const filtres = document.querySelector(".fitres")

    bouton.addEventListener('click', () =>{
        console.log("Youpi", document);
        appear = document.querySelector(".menu-btn").classList.add('menu-btn-appear');
        menu = document.querySelector(".menu").classList.add('menu-background');
    });
},false);

// faire apparaitre juste une grosse div 