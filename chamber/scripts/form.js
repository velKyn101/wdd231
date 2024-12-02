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
