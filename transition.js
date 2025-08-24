// transition.js

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Start with hidden state
    body.style.opacity = 0;
    body.style.transition = "opacity 0.6s ease";

    // Fade in when page loads
    requestAnimationFrame(() => {
        body.style.opacity = 1;
    });

    // Fade out on navigation
    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("click", e => {
            const href = el.getAttribute("href");

            // Only fade out for real links (not # or javascript:void)
            if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
                e.preventDefault();
                body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // match fade-out speed
            }
        });
    });
});
