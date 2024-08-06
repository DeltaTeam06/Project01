document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("registerButton");
  const registerModal = document.getElementById("registerModal");
  const closeModalButton = document.getElementById("closeModal");

  registerButton.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
  });

  // Hide modal
  closeModalButton.addEventListener("click", () => {
    registerModal.classList.add("hidden");
  });

  // Optionally, close the modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === registerModal) {
      registerModal.classList.add("hidden");
    }
  });
});
