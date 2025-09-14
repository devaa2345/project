// transition.js

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Ensure body starts hidden until fade-in
    body.classList.remove("fade-in");

    // When page is ready, fade in
    requestAnimationFrame(() => {
        body.classList.add("fade-in");
    });

    // Handle page fade-out on navigation
    document.querySelectorAll("a[href], button[href]").forEach(el => {
        el.addEventListener("click", e => {
            const href = el.getAttribute("href");

            // Only trigger for real links (not # or JS void)
            if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
                e.preventDefault();

                // Fade out
                body.classList.remove("fade-in");

                // Navigate after fade-out
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // must match CSS transition time
            }
        });
    });
});

// Loader fade-out (if exists)
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 500); // Loader fades before content
    }
});

