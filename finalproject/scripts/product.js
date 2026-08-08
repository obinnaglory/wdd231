// ==========================================
// GloryBeauty Palace
// products.js (Part 1)
// ==========================================

import { openModal } from "./modal.js";
import { saveFavorite, getFavorites } from "./storage.js";

let products = [];

// ==========================================
// Load All Products
// ==========================================

export async function loadProducts() {

    const container = document.querySelector("#productContainer");

    if (!container) return;

    container.innerHTML = `
        <div class="loading">
            Loading Products...
        </div>
    `;

    try {

        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error("Unable to load product data.");
        }

        const data = await response.json();

        products = data.products;

        displayProducts(products);

        initializeFilter();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="error">
                Sorry, products could not be loaded.
            </div>
        `;

    }

}

// ==========================================
// Featured Products
// Home Page
// ==========================================

export async function loadFeaturedProducts() {

    const container = document.querySelector("#featuredProducts");

    if (!container) return;

    try {

        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error("Unable to load featured products.");
        }

        const data = await response.json();

        const featured = data.products.slice(0, 3);

        container.innerHTML = "";

        featured.forEach(product => {

            container.appendChild(createCard(product));

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Display Products
// ==========================================

function displayProducts(list) {

    const container = document.querySelector("#productContainer");

    container.innerHTML = "";

    list.forEach(product => {

        container.appendChild(createCard(product));

    });

}

// ==========================================
// Create Product Card
// ==========================================

function createCard(product) {

    const favorites = getFavorites();

    const article = document.createElement("article");

    article.classList.add("product-card");

    article.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            width="300"
            height="300">

        <div class="product-info">

            <span class="category">

                ${product.category}

            </span>

            <h3>

                ${product.name}

            </h3>

            <p class="price">

                ₦${product.price}

            </p>

            <p>

                ${product.description}

            </p>

            <div class="card-buttons">

                <button
                    class="details-btn">

                    View Details

                </button>

                <button
                    class="favorite-btn">

                    ${
                        favorites.includes(product.id)
                        ? "♥ Favorite"
                        : "♡ Favorite"
                    }

                </button>

            </div>

        </div>

    `;

    const detailsButton =
        article.querySelector(".details-btn");

    detailsButton.addEventListener("click", () => {

        openModal(product);

    });

    const favoriteButton =
        article.querySelector(".favorite-btn");

    favoriteButton.addEventListener("click", () => {

        saveFavorite(product.id);

        favoriteButton.textContent =
            favoriteButton.textContent.includes("♥")
            ? "♡ Favorite"
            : "♥ Favorite";

    });

    return article;

}

// ==========================================
// Product Filter
// ==========================================

function initializeFilter() {

    const select =
        document.querySelector("#category");

    const clearButton =
        document.querySelector("#clearFilter");

    if (!select) return;

    select.addEventListener("change", () => {

        if (select.value === "all") {

            displayProducts(products);

            return;

        }

        const filtered =
            products.filter(product =>

                product.category === select.value

            );

        displayProducts(filtered);

    });

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            select.value = "all";

            displayProducts(products);

        });

    }

}