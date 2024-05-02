let header = document.getElementById('header');
let header2 = document.getElementById('header2');

window.addEventListener("scroll", function(){
    let value = window.scrollY;
    document.getElementById('top').style.top = value * 0.12 + 'px';
    document.getElementById('bottom').style.top = value * 1.8 +'px';
    document.getElementById('section2').style.height = value * 2 + 'px';
    // console.log(value);

    if (value >= 320) {
        document.getElementById('bottom').style.visibility = "hidden";
    } else {
        document.getElementById('bottom').style.visibility = "visible";
    }

    if (value >= 190) {
        header.style.opacity = "1";
        header2.style.opacity = "1";
    }
});

document.addEventListener("DOMContentLoaded", function(){
    let posts = 'https://v2.api.noroff.dev/blog/posts/Yeager_test';
    fetch(posts)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('postData', JSON.stringify(data));
            displayCarousel();
        });

    function displayCarousel() {
        let postData = JSON.parse(localStorage.getItem('postData'));
        let post = postData.data;
        let currentIndex = 0;

        function showPost(index) {
            let postCarousel = post[index];
            let title = postCarousel.title;
            let image = postCarousel.media.url;

            let titleDiv = document.querySelector('.title');
            titleDiv.textContent = title;
            if (title.length > 30) {
                titleDiv.style.transform = "translate(16px, -98px)";
            } else {
                titleDiv.style.transform = "translate(16px, -55px)";
            }

            let imageDiv = document.querySelector('.image');
            imageDiv.src = image;
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
});

