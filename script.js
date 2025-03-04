document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetEl = document.querySelector(this.getAttribute("href"));
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});


function filterProjects(category) {
  const projects = document.querySelectorAll(".project-item");
  projects.forEach(project => {
    // Check if the project matches the selected category or if "all" is selected
    if (category === "all" || project.dataset.category === category) {
      project.style.display = "";
    } else {
      project.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Add click event listeners to all filter buttons
  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      filterProjects(category);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Create and style the modal container
  const modal = document.createElement("div");
  modal.id = "lightbox-modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  modal.style.display = "none";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  // Create an img element to show the clicked image
  const modalImg = document.createElement("img");
  modalImg.style.maxWidth = "90%";
  modalImg.style.maxHeight = "90%";
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  // Close lightbox when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target !== modalImg) {
      modal.style.display = "none";
    }
  });

  // Add lightbox effect to project images
  const projectImages = document.querySelectorAll(".project-item img");
  projectImages.forEach(image => {
    image.style.cursor = "pointer";
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modal.style.display = "flex";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const nameInput = contactForm.querySelector("input[name='name']");
  const emailInput = contactForm.querySelector("input[name='email']");
  const messageInput = contactForm.querySelector("textarea[name='message']");

  function showError(field, message) {
    let errorEl = field.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains("error-message")) {
      errorEl = document.createElement("div");
      errorEl.className = "error-message";
      errorEl.style.color = "red";
      errorEl.style.fontSize = "0.9em";
      field.parentNode.insertBefore(errorEl, field.nextSibling);
    }
    errorEl.textContent = message;
    field.classList.add("invalid");
  }

  function removeError(field) {
    let errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
      errorEl.remove();
    }
    field.classList.remove("invalid");
  }

  function validateField(field) {
    const value = field.value.trim();
    if (value === "") {
      showError(field, "This field is required.");
      return false;
    }

    if (field === emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(field, "Please enter a valid email.");
        return false;
      }
    }

    removeError(field);
    return true;
  }

  [nameInput, emailInput, messageInput].forEach(field => {
    field.addEventListener("input", () => {
      validateField(field);
    });
  });

  contactForm.addEventListener("submit", (e) => {
    let isValid = true;
    [nameInput, emailInput, messageInput].forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    if (!isValid) {
      e.preventDefault();
    }
  });
});