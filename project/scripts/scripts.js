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
    const response = await fetch('scripts/users.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();

    // Ensure at least 15 items are displayed
    while (comments.length < 15) {
      comments.push({
        name: "Anonymous",
        position: "Visitor",
        message: "No comment provided.",
        eval: Math.floor(Math.random() * 5) + 1 // Random rating between 1 and 5
      });
    }

    displayComments(comments);
  } catch (error) {
    console.error("Error loading users data:", error);
  }
}

function displayComments(comments) {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = ""; // Clear existing content

  comments.slice(0, 15).forEach(comment => {
    const message = comment.message || 'No message provided';
    const eval = comment.eval || 0;

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment-card";


    commentDiv.innerHTML = `
      <h3>${comment.name}</h3>
      <p class="position">${comment.position}</p>
      <p class="message">${message}</p>
      <p class="rating">${'⭐'.repeat(eval)}</p>
    `;
    commentsContainer.appendChild(commentDiv);
  });
}
