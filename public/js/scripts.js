"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Validate newsletter form submission
  const newsletterForm = document.querySelector("#newsletterForm");
  newsletterForm.addEventListener("submit", (event) => {
    const email = document.querySelector("#email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      event.preventDefault();
    }
  });

  // Toggle dark mode
  const toggleDarkModeButton = document.querySelector("#toggleDarkMode");
  toggleDarkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
