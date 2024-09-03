const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// unplash API
let count = 5;
const apikey = 'EIT8M-HNqUXxy50uAT3sTPFypdPDBB_-V-w2n9o7Nv0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// check if all image were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
    }
}

// helper funtion to set attibutes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links % photos , add to dom
function displayPhotos() {
    photoArray.forEach((photo) => {
        imagesLoaded = 0;
        totalImages = photoArray.length;
        // create <a>  to link to unplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_black',
        });
        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event lishter , check when eash is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imagecontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// get photos from unplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}

//check to see if scrollinh near bottom page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();