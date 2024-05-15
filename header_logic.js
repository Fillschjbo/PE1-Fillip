let burgerMenuOpen = document.querySelector('.burgerMenu');
let burgerMenuClose = document.querySelector('.burgerMenuClose')
burgerMenuOpen.addEventListener('click', function(){
    let burgerNav = document.querySelector('.burgerNav');
        burgerNav.style.display = 'flex';
})

burgerMenuClose.addEventListener('click', function (){
    let burgerNav = document.querySelector('.burgerNav');
    burgerNav.style.display = 'none';
})