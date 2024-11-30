function showModal() {
    document.getElementById('membership-benefits').style.display = 'block';
}

function closeModal() {
    document.getElementById('membership-benefits').style.display = 'none';
}

// Set the timestamp when the form is loaded
document.getElementById('form-timestamp').value = new Date().toISOString();