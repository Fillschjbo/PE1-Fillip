let loginBtn = document.querySelector('.loginBtn');
let email = document.getElementById('email');
let password = document.getElementById('password');

loginBtn.addEventListener('click', function(){
    const requestBody  = {
        "email": email.value, //filliperkul@stud.noroff.no
        "password": password.value //passord1
    };

    fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then (response => {
            if (!response.ok) {
                return response.json().then(data => {
                    let errorMessage = 'Failed to log in ';
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
        .then (responseData => {
            window.location.href = '../index.html';
            let accessToken = responseData.data.accessToken;
            let user = responseData.data.name;
            let avatar = responseData.data.avatar.url;
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('user', user);
            localStorage.setItem('avatar', avatar)
        })
        .catch(error => {
            let errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = error.message;
            console.log(error)
        });
})