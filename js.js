let header = document.getElementById('header');
let header2 = document.getElementById('header2');
let postHeader = document.querySelector('.postsHeader');

window.addEventListener("scroll", function() {
    let value = window.scrollY;
    if (value < 850){
    document.getElementById('top').style.top = value * 0.12 + 'px';
    document.getElementById('bottom').style.top = value * 1.8 + 'px';
    document.getElementById('section2').style.height = value * 2 + 'px';
    }

    if (value >= 320) {
        document.getElementById('bottom').style.visibility = "hidden";
    } else {
        document.getElementById('bottom').style.visibility = "visible";
    }

    if (value >= 190) {
        header.style.opacity = "1";
        header2.style.opacity = "1";
    }

    if (value >= 800) {
        postHeader.style.opacity = "1";
    }


    if (value < 1300) {
        postHeader.style.marginTop = value * .31 + 'px';
    }
});

document.addEventListener("DOMContentLoaded", function(){
    let posts = 'https://v2.api.noroff.dev/blog/posts/Yeager_test';
    fetch(posts)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('postData', JSON.stringify(data));
            displayCarousel();
            displayGrid();
        });

    function displayCarousel() {
        let postData = JSON.parse(localStorage.getItem('postData'));
        let post = postData.data;
        let currentIndex = 0;

        function showPost(index) {
            let postCarousel = post[index];
            let title = postCarousel.title;
            let image = postCarousel.media.url;
            let id = postCarousel.id;

            let titleDiv = document.querySelector('.title');
            titleDiv.textContent = title;
            if (title.length > 30) {
                titleDiv.style.transform = "translate(16px, 188px)";
            } else {
                titleDiv.style.transform = "translate(16px, 225px)";
            }


            let imageDiv = document.querySelector('.image');
            imageDiv.src = image;
            imageDiv.style.opacity = '0';
            setTimeout(() =>{
                imageDiv.style.opacity = '1';
            }, 125);

            let click = document.querySelector('.img');
            click.addEventListener("click", function(){
                localStorage.setItem('postId', id);
            })
        }

        showPost(currentIndex);

        let next = document.querySelector('.nextBtn');
        let back = document.querySelector('.backBtn');

        next.onclick = function() {
            currentIndex = (currentIndex + 1) % post.length;
            showPost(currentIndex);
        };

        back.onclick = function() {
            currentIndex = (currentIndex - 1 + post.length) % post.length;
            showPost(currentIndex);
        };
    }

    function displayGrid() {
        let postData = JSON.parse(localStorage.getItem('postData'));
        let posts = postData.data;

        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let id = post.id;

            let postGrid = document.querySelector('.postsGrid');
            let postContainer = document.createElement('a');
            postContainer.classList.add('postContainer');
            postContainer.href = "post/index.html";
            postGrid.appendChild(postContainer);

            let image = document.createElement('img');
            image.classList.add('postImage');
            image.src = post.media.url;
            postContainer.appendChild(image);

            let title = document.createElement('div');
            title.classList.add('postTitle');
            title.textContent = post.title;
            postContainer.appendChild(title);
            if (post.title.length > 30) {
                title.style.transform = "translate(8px, 125px)";
            } else {
                title.style.transform = "translate(8px, 160px)";
            }

            let optionsBtn = document.createElement('div');
            optionsBtn.classList.add('optionsBtn');
            postContainer.appendChild(optionsBtn);
            for (x=0; x<3; x++) {
                let circle = document.createElement('div');
                circle.classList.add('circle');
                optionsBtn.appendChild(circle);
            }

            postContainer.addEventListener("click", function(){
                localStorage.setItem('postId', id)
            })

        }
    }
});


