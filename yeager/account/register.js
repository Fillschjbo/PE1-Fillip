let uploadImage = document.querySelector('.profilePicWrapper');
let urlField = document.getElementById("url");
let submitBtn = document.querySelector('.submit');
let closeBtn = document.querySelector('.closeBtn');
let urlModal = document.querySelector('.urlModal');

uploadImage.addEventListener('click', function(){
    urlModal.style.display = 'flex';
});

submitBtn.addEventListener('click', function(){
    urlModal.style.display = 'none';
});

submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    urlModal.style.display = 'none';
    let avatar = document.querySelector('.selectProfilePic');
    let updatedAvatar = document.getElementById('url');
    avatar.src = updatedAvatar.value;

});

closeBtn.addEventListener('click', function(){
    urlModal.style.display = 'none';
});

let profilePic = document.getElementById('url');
let email = document.getElementById('email');
let username = document.getElementById('username');
let password = document.getElementById('password');
let confirm = document.getElementById('confirm');

let createAccount = document.querySelector('.createProfileBtn');

createAccount.addEventListener('click', function(event){
    event.preventDefault();
    if (password.value === confirm.value)
    {
        const requestBody = {
            "name": username.value,
            "email": email.value,
            "password": password.value,
            "bio": "This is my profile bio",
            "avatar": {
                "url": profilePic.value,
                "alt": "My avatar alt text"
            },
            "banner": {
                "url": "https://images.unsplash.com/photo-1712672117537-0ab4f26d1e7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "alt": "My banner alt text"
            }
        };

        fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then (response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        let errorMessage = 'Failed to register';
                        if (data.errors && Array.isArray(data.errors)) {
                            errorMessage = data.errors.map(err => err.message).join(', ');
                        } else if (data.message) {
                            errorMessage = data.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            })
            .then (data => {
                console.log(data) //yay
                window.location.href = '../index.html';
            })
            .catch(error => {
                let errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = error.message;
                console.log(error)
            });
    }else {
        let errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Passwords do not match';
    }
});
