// ===========================================
// GloryBeauty Palace
// navigation.js
// Responsive Navigation
// ===========================================

export function initNavigation() {

    const menuButton = document.querySelector("#menuButton");
    const navigation = document.querySelector("#navigation");

    // Stop if navigation doesn't exist
    if (!menuButton || !navigation) return;

    // Toggle mobile navigation
    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const expanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            !expanded
        );

        menuButton.textContent =
            navigation.classList.contains("open") ? "✕" : "☰";

    });

    // Close navigation after clicking a link (mobile)
    const links = navigation.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth < 768) {

                navigation.classList.remove("open");

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });

    // Reset navigation on desktop resize
    window.addEventListener("resize", () => {

        if (window.innerWidth >= 768) {

            navigation.classList.remove("open");

            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}