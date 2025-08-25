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

    // Smooth scrolling for same-page anchors (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Fade out on navigation (for other links/pages)
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
