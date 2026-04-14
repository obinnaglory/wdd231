console.log("Main JS Loaded");

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadServices();
  setupModal();
});

// ==========================
// FETCH DATA FUNCTION
// ==========================
async function fetchData() {
  try {
    const response = await fetch("data/data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Save to localStorage
    localStorage.setItem("beautyData", JSON.stringify(data));

    return data;

  } catch (error) {
    console.error("Fetch Error:", error);

    // fallback to localStorage
    const storedData = localStorage.getItem("beautyData");
    return storedData ? JSON.parse(storedData) : null;
  }
}

// ==========================
// LOAD PRODUCTS (INDEX)
// ==========================
async function loadProducts() {
  const container = document.querySelector("#product-list");
  if (!container) return;

  const data = await fetchData();
  if (!data) return;

  container.innerHTML = "";

  data.products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p><strong>${product.price}</strong></p>
      <p>${product.description}</p>
    `;

    // CLICK EVENT → SHOW MODAL
    card.addEventListener("click", () => openModal(product));

    container.appendChild(card);
  });
}

// ==========================
// LOAD SERVICES (SERVICES PAGE)
// ==========================
async function loadServices() {
  const container = document.querySelector("#services-list");
  if (!container) return;

  const data = await fetchData();
  if (!data) return;

  container.innerHTML = "";

  data.services.forEach(service => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${service.image}" alt="${service.name}" loading="lazy">
      <h3>${service.name}</h3>
      <p><strong>${service.price}</strong></p>
      <p>${service.type}</p>
      <p>${service.description}</p>
    `;

    // CLICK EVENT → SHOW MODAL
    card.addEventListener("click", () => openModal(service));

    container.appendChild(card);
  });
}

// ==========================
// MODAL FUNCTIONALITY
// ==========================
function setupModal() {
  const modal = document.querySelector("#service-modal");
  const closeBtn = document.querySelector(".close");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

function openModal(item) {
  const modal = document.querySelector("#service-modal");
  const details = document.querySelector("#modal-details");

  if (!modal || !details) return;

  details.innerHTML = `
    <h2>${item.name}</h2>
    <img src="${item.image}" alt="${item.name}" style="width:100%">
    <p><strong>${item.price}</strong></p>
    <p>${item.description}</p>
  `;

  modal.classList.remove("hidden");
}