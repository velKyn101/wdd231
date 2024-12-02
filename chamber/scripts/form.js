// Modal functionality
function showModal() {
    // Show the modal
    document.getElementById('membership-benefits').style.display = 'block';

    // Add blur effect to the rest of the page
    const pageContent = document.querySelectorAll('.page-content');
    pageContent.forEach(content => content.classList.add('blur'));
}

function closeModal() {
    // Hide the modal
    document.getElementById('membership-benefits').style.display = 'none';

    // Remove blur effect from the rest of the page
    const pageContent = document.querySelectorAll('.page-content');
    pageContent.forEach(content => content.classList.remove('blur'));
}

// Set the timestamp when the form is loaded
document.getElementById('form-timestamp').value = new Date().toISOString();
document.getElementById('form-timestamp').textContent = new Date().toISOString();
// Extract query parameters from URL
const urlParams = new URLSearchParams(window.location.search);

// Get form field values and display them
document.getElementById('fname').textContent = urlParams.get('fname') || 'N/A';
document.getElementById('lname').textContent = urlParams.get('lname') || 'N/A';
document.getElementById('title').textContent = urlParams.get('title') || 'N/A';
document.getElementById('email').textContent = urlParams.get('email') || 'N/A';
document.getElementById('phone').textContent = urlParams.get('phone') || 'N/A';
document.getElementById('org').textContent = urlParams.get('org') || 'N/A';
document.getElementById('membership').textContent = urlParams.get('membership') || 'N/A';

// Optional: Set year and last modified dynamically
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last Modified: ' + document.lastModified;
