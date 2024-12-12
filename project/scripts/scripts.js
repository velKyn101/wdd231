function navEffect(x) {
  x.classList.toggle("change");

  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');

  document.body.classList.toggle('blur');
}

addEventListener('DOMContentLoaded', function() {
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  loadComments(); // Load comments on page load
});

async function loadComments() {
  try {
    const response = await fetch('scripts/users.json'); // Adjusted path for consistency
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    
    // Select 4 random comments
    const randomComments = getRandomItems(comments, 4);

    displayComments(randomComments);
  } catch (error) {
    console.error("Error loading users data:", error);
  }
}

function displayComments(comments) {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = ""; // Clear existing content

  comments.forEach(comment => {
    // Handle inconsistencies in data structure
    const message = comment.message || comment.texto || 'No message provided';
    const eval = comment.eval || comment.avaliacao || 0;

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment-card"; // Updated for consistent styling
    commentDiv.innerHTML = `
      <h3>${comment.name}</h3>
      <p class="position">${comment.position}</p>
      <p class="message">${message}</p>
      <p class="rating">Rating: ${'⭐'.repeat(eval)}</p>
    `;
    commentsContainer.appendChild(commentDiv);
  });
}

// Utility function to get random items
function getRandomItems(array, count) {
  const shuffled = array.slice().sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, count); // Return the first 'count' items
}
