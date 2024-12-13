let currentIndex = 0;
const commentsContainer = document.querySelector(".carousel-items");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let comments = []; // Inicializando a variável de comentários

function navEffect(x) {
  x.classList.toggle("change");

  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');

  document.body.classList.toggle('blur');
}

addEventListener('DOMContentLoaded', function () {
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  loadComments(); // Load comments on page load

  // Atualizar carrossel ao redimensionar
  window.addEventListener("resize", () => {
    currentIndex = 0; // Reiniciar índice
    displayComments(); // Recalcular itens visíveis
  });
});

async function loadComments() {
  try {
    const response = await fetch('scripts/users.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    comments = await response.json();

    // Garantir que pelo menos 15 comentários sejam exibidos
    while (comments.length < 15) {
      comments.push({
        name: "Anonymous",
        position: "Visitor",
        message: "No comment provided.",
        eval: Math.floor(Math.random() * 5) + 1 // Avaliação aleatória entre 1 e 5
      });
    }

    displayComments();
  } catch (error) {
    console.error("Erro ao carregar dados de usuários:", error);
  }
}

function getCommentsPerPage() {
  return window.innerWidth <= 768 ? 1 : 3; // 1 em telas pequenas, 3 em maiores
}

function displayComments() {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = ""; // Limpar o conteúdo existente

  const commentsPerPage = getCommentsPerPage();
  const displayComments = comments.slice(currentIndex, currentIndex + commentsPerPage);

  displayComments.forEach(comment => {
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

  // Atualizar visibilidade dos botões
  prevButton.style.display = currentIndex > 0 ? "block" : "none";
  nextButton.style.display = (currentIndex + commentsPerPage < comments.length) ? "block" : "none";
}

function storeName(event) {
  event.preventDefault();  // Previne o envio do formulário
  
  const name = document.getElementById("fname").value;  // Obtém o valor do nome
  localStorage.setItem("name", name);  // Armazena o nome no localStorage
  
  window.location.href = "thanks.html";  // Redireciona para a página de agradecimento
}

// Navegação do carrossel
prevButton.addEventListener('click', () => {
  const commentsPerPage = getCommentsPerPage();
  if (currentIndex > 0) {
    currentIndex -= commentsPerPage;
    displayComments();
  }
});

nextButton.addEventListener('click', () => {
  const commentsPerPage = getCommentsPerPage();
  if (currentIndex + commentsPerPage < comments.length) {
    currentIndex += commentsPerPage;
    displayComments();
  }
});