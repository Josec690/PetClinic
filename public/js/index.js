document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      const answer = button.nextElementSibling;
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
      } else {
        answer.style.display = 'block';
      }
    });
  });

  ocument.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});