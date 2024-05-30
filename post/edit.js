let postBtn = document.querySelector('.confirm');
let uploadImage = document.querySelector('.uploadImage');
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

});

closeBtn.addEventListener('click', function(){
    urlModal.style.display = 'none';
});

let cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', function(){
    window.location.href = "index.html"
    localStorage.removeItem('editMode');
})

document.addEventListener('DOMContentLoaded', function(){
    let editMode = 'editMode' in localStorage;

    if (editMode) {
        let title = document.getElementById('title')
        let image = document.getElementById('url');
        let body = document.getElementById('body');
        let postData = JSON.parse(localStorage.getItem('post'));

        title.value = postData.data.title;
        image.value = postData.data.media.url;
        body.value = postData.data.body;
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.style.display = 'flex';

        deleteBtn.addEventListener('click', function(){
            let delModal = document.querySelector('.deleteModal');
            delModal.style.display = 'flex'

            let cancelDel = document.querySelector('.cancelDel');
            cancelDel.addEventListener('click', function (){
                delModal.style.display = 'none';
            })

            let confirmDel = document.querySelector('.confirmDel');
            confirmDel.addEventListener('click', function(){
                let accessToken = localStorage.getItem('accessToken');
                let user = localStorage.getItem('user');
                let postId = localStorage.getItem('postId');

                fetch(`https://v2.api.noroff.dev/blog/posts/${user}/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                    .then (response => {
                        if (!response.ok) {
                            return response.json().then(data => {
                                let errorMessage = 'Failed to Delete Post';
                                if (data.errors && Array.isArray(data.errors)) {
                                    errorMessage = data.errors.map(err => err.message).join(', ');
                                } else if (data.message) {
                                    errorMessage = data.message;
                                }
                                throw new Error(errorMessage);
                            });
                        }else {
                            window.location.href = '../index.html';
                        }
                        return response.json();
                    })
                    .catch(error => {
                        let errorMessage = document.getElementById('errorMessage');
                        errorMessage.textContent = error.message;
                        console.log(error)
                    });
            })
        })
    }else {
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.style.display ='none';
    }
})

postBtn.addEventListener('click', function() {
    let title = document.getElementById('title')
    let image = document.getElementById('url');
    let body = document.getElementById('body');

    let accessToken = localStorage.getItem('accessToken');
    let user = localStorage.getItem('user');
    let postId = localStorage.getItem('postId');

    const requestBody  = {
        "title": title.value,
        "body": body.value,
        "media": {
        "url": image.value,
            "alt": "post image"
    }
    }

    let editMode = 'editMode' in localStorage;

    if (editMode) {
        fetch(`https://v2.api.noroff.dev/blog/posts/${user}/${postId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody)
        })
            .then (response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        let errorMessage = 'Failed to Update Post';
                        if (data.errors && Array.isArray(data.errors)) {
                            errorMessage = data.errors.map(err => err.message).join(', ');
                        } else if (data.message) {
                            errorMessage = data.message;
                        }
                        throw new Error(errorMessage);
                    });
                }else {
                    window.location.href = '../index.html';
                }
                return response.json();
            })
            .catch(error => {
                let errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = error.message;
                console.log(error)
            });
    }else{
        fetch(`https://v2.api.noroff.dev/blog/posts/${user}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody)
        })
            .then (response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        let errorMessage = 'Failed to post';
                        if (data.errors && Array.isArray(data.errors)) {
                            errorMessage = data.errors.map(err => err.message).join(', ');
                        } else if (data.message) {
                            errorMessage = data.message;
                        }
                        throw new Error(errorMessage);
                    });
                }else {
                    window.location.href = '../index.html';
                }
                return response.json();
            })
            .catch(error => {
                let errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = error.message;
                console.log(error)
            });
    }
})