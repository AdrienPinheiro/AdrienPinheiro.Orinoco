const bouton = document.querySelector(".research-category")
const appear = document.querySelector(".menu-btn")
const menu = document.querySelector(".menu")
const column = document.querySelector(".column")
const category = document.querySelector(".category")
const filtres = document.querySelector(".fitres")

bouton.addEventListener('click', () =>{
    console.log("Youpi");
    appear = document.classList.add('menu-btn-appear');
    menu = document.classList.add('menu-background');
});

