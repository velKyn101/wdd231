document.addEventListener("DOMContentLoaded", () => {
    displayVisitMessage();
    addImageHoverEffect();
    displayFooterInfo();
    addLazyLoading();
});

function displayVisitMessage() {
    const visitMessageElement = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    
    if (!lastVisit) {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
        if (timeDifference < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            visitMessageElement.textContent = `You last visited ${timeDifference} ${timeDifference === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentTime);
}

function addImageHoverEffect() {
    if (window.innerWidth > 768) { // Only apply the hover effect on non-mobile views
        const images = document.querySelectorAll('.gallery img');
        images.forEach(image => {
            image.addEventListener('mouseover', () => {
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.3s';
            });

            image.addEventListener('mouseout', () => {
                image.style.transform = 'scale(1)';
            });
        });
    }
}

function displayFooterInfo() {
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");
    
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = 'Last Modified: ' + document.lastModified;
}

function addLazyLoading() {
    const images = document.querySelectorAll('.gallery img');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set the loading attribute to 'lazy' for images appearing in the viewport
                entry.target.setAttribute('loading', 'lazy');
                observer.unobserve(entry.target); // Stop observing the image after it's been lazy loaded
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed for when the image is considered "in view"

    images.forEach(image => {
        observer.observe(image);
    });
}
