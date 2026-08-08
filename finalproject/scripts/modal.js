// ==========================================
// GloryBeauty Palace
// modal.js
// WDD 231 Final Project
// ==========================================

let modal;
let modalContent;
let closeButton;

// ==========================================
// Initialize Modal
// ==========================================

export function initModal() {

    modal = document.querySelector("#productModal");
    modalContent = document.querySelector("#modalContent");
    closeButton = document.querySelector("#closeModal");

    // Stop if modal doesn't exist
    if (!modal || !modalContent || !closeButton) return;

    // Close button
    closeButton.addEventListener("click", closeModal);

    // Close when clicking outside the dialog
    modal.addEventListener("click", (event) => {

        const rect = modal.getBoundingClientRect();

        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            closeModal();
        }

    });

    // Close with Escape key
    modal.addEventListener("cancel", (event) => {

        event.preventDefault();
        closeModal();

    });

}

// ==========================================
// Open Modal
// ==========================================

export function openModal(product) {

    if (!modal || !modalContent) return;

    modalContent.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            width="400"
            height="400">

        <h2>${product.name}</h2>

        <p class="category">
            <strong>Category:</strong>
            ${product.category}
        </p>

        <p class="price">
            <strong>Price:</strong>
            ₦${product.price}
        </p>

        <p>
            ${product.description}
        </p>

    `;

    modal.showModal();

}

// ==========================================
// Close Modal
// ==========================================

export function closeModal() {

    if (!modal) return;

    modal.close();

}