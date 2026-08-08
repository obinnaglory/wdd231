// ===============================
// GloryBeauty Palace
// WDD 231 Final Project
// main.js
// ===============================

import { initNavigation } from "./navigation.js";
import { loadProducts, loadFeaturedProducts } from "./products.js";
import { initModal } from "./modal.js";

// -------------------------------
// Navigation
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    initModal();

    updateFooter();

    loadCurrentYear();

    // Shop Page
    if (document.querySelector("#productContainer")) {
        loadProducts();
    }

    // Home Page
    if (document.querySelector("#featuredProducts")) {
        loadFeaturedProducts();
    }

    // Thank You Page
    if (document.querySelector(".submission-details")) {
        displayFormData();
    }

});


// ===============================
// Footer
// ===============================

function updateFooter() {

    const modified = document.querySelector("#lastModified");

    if (modified) {

        modified.textContent =
            `Last Modified: ${document.lastModified}`;

    }

}

function loadCurrentYear() {

    const year = document.querySelector("#year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

}


// ===============================
// Display Form Data
// thankyou.html
// ===============================

function displayFormData() {

    const params = new URLSearchParams(window.location.search);

    const fields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "product",
        "message"
    ];

    fields.forEach(field => {

        const element = document.querySelector(`#${field}`);

        if (element) {

            element.textContent =
                params.get(field) || "Not Provided";

        }

    });

}