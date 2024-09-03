const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];

// unplash API
const count = 10;
// const apikey = 'EIT8M-HNqUXxy50uAT3sTPFypdPDBB_-V-w2n9o7Nv0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// helper funtion to set attibutes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links % photos , add to dom
function displayPhotos() {
    photoArray.forEach((photo) => {
        // create <a>  to link to unplash
        const item = document.createElement('a'
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            terget: '_black',
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

// On load
getPhotos();