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

let avatar = document.getElementById('avatar');
let dropdownWrapper = document.getElementById('dropdown');

avatar.addEventListener('click', function(e) {
    dropdownWrapper.style.display = dropdownWrapper.style.display === 'block' ? 'none' : 'block';
    e.stopPropagation();
});

document.addEventListener('click', function(e) {
    if (!dropdownWrapper.contains(e.target)) {
        dropdownWrapper.style.display = 'none';
    }
});

dropdownWrapper.addEventListener('click', function(e) {
    e.stopPropagation();
});

let homeBtnDesktop = document.getElementById('homeDesktop');
homeBtnDesktop.addEventListener('click', function(){
    let currentUrl = window.location.href;
    if (currentUrl.includes('post/index.html') || currentUrl.includes('account/register.html') || currentUrl.includes('edit.html') || currentUrl.includes('login.html')) {
        window.location.href = '../index.html';
    }else {
        window.location.href = 'index.html'
    }
});

let homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', function(){
    let currentUrl = window.location.href;
    if (currentUrl.includes('post/index.html') || currentUrl.includes('account/register.html') || currentUrl.includes('edit.html') || currentUrl.includes('login.html')) {
        window.location.href = '../index.html';
    }else {
        window.location.href = 'index.html'
    }
})

document.addEventListener('DOMContentLoaded', function() {
    let userIsLoggedIn = 'accessToken' in localStorage;
    let logIn = document.getElementById('logIn');
    let profilePic = document.querySelector('.profilePic')
    let avatar = localStorage.getItem('avatar');
    let user = localStorage.getItem('user')

    if (userIsLoggedIn) {
        logIn.innerText = "Log Out";
        logIn.addEventListener('click', function() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            alert("You have been logged out.");
            location.reload();
        });

        profilePic.src = avatar;

        let loggedIn = document.querySelector('.dropdownList');
        let username = document.createElement('li');
        username.innerText = `Logged in as ${user}`;
        loggedIn.appendChild(username)

        let profile = document.createElement('li');
        profile.innerText = 'Profile';
        loggedIn.appendChild(profile)

        let logOut = document.createElement('li');
        logOut.innerText = "Log Out";
        logOut.addEventListener('click', function() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            alert("You have been logged out.");
            location.reload();
        });
        loggedIn.appendChild(logOut);
    } else {
        logIn.addEventListener('click', function() {
            let currentUrl = window.location.href;
            if (currentUrl.includes('post/index.html') || currentUrl.includes('account/register.html') || currentUrl.includes('edit.html')) {
                window.location.href = '../account/login.html'
            }else {
                window.location.href = 'account/login.html'
            }
        });

        let loggedIn = document.querySelector('.dropdownList');
        let logInBtn = document.createElement('li');
        logInBtn.innerText = 'Log In';
        logInBtn.addEventListener('click', function() {
            let currentUrl = window.location.href;
            if (currentUrl.includes('post/index.html') || currentUrl.includes('account/register.html') || currentUrl.includes('edit.html')) {
                window.location.href = '../account/login.html'
            }else {
                window.location.href = 'account/login.html'
            }
        });

        loggedIn.appendChild(logInBtn)

        let dropdownMenu = document.getElementById('dropdown');
        dropdownMenu.style.height = '55px';
    }
});