document.addEventListener('DOMContentLoaded', function (){
    let postID = localStorage.getItem('postId');
    let post = `https://v2.api.noroff.dev/blog/posts/Yeager_test/${postID}`
    fetch(post)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('post', JSON.stringify(data))
            displayData();
        });

    if (postID) {
        updateURL(postID);
    }

    function updateURL(postID) {
        let url = new URLSearchParams(window.location.search);
        url.set('post', `${postID}`);
        let newURL = window.location.pathname + '?' + url.toString();
        history.pushState({ path: newURL }, '', newURL);
    }

    function displayData(){
        let postData = JSON.parse(localStorage.getItem('post'));
        let post = postData.data
        let postWrapper = document.querySelector('.postWrapper');
        let postInfo = document.querySelector('.postInfo');
        let profile = document.querySelector('.profile');
        let imageTitle = document.querySelector('.imageTitle');

        let image = document.querySelector('.image');
        image.src = post.media.url;
        image.alt = post.media.alt;
        imageTitle.appendChild(image);

        let title = document.querySelector('.title');
        title.textContent = post.title;
        imageTitle.appendChild(title);

        let profilePic = document.querySelector('.profilePicture');
        profilePic.src = post.author.avatar.url;
        if (profilePic.src === 'https://images.unsplash.com/photo-1615498275525-9501c6c44760?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') {
            profilePic.src = '../assets/icons/Profile_Icon.jpeg';
        }else {
            profilePic.src = post.author.avatar.url;
        }
        profile.appendChild(profilePic);

        let author = document.querySelector('.user');
        author.textContent = 'POSTED BY ' + post.author.name;
        profile.appendChild(author);

        let date = document.querySelector('.date');
        let dateData = post.created;
        let dateConvert = new Date(dateData);
        date.textContent = dateConvert.toUTCString();
        postInfo.appendChild(date);

        let body = document.querySelector('.body');
        body.innerText = post.body;
        postWrapper.appendChild(body);
    }
})


