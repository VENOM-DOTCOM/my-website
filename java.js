/* =========================
   Loader
========================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }
});

/* =========================
   Theme Toggle (Safe)
========================= */
(function() {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        localStorage.setItem("theme", isLight ? "light" : "dark");
        themeBtn.textContent = isLight ? "☀️" : "🌙";
    });
})();

/* =========================
   Projects System (Safe Render)
========================= */
(function() {
    const container = document.getElementById("projectsContainer");
    const emptyState = document.getElementById("emptyState");

    if (!container || !emptyState) return;

    let projects = [];

    try {
        projects = JSON.parse(localStorage.getItem("projects")) || [];
    } catch (e) {
        console.error("Invalid projects data in localStorage");
        projects = [];
    }

    function renderProjects() {
        container.innerHTML = "";

        if (!projects.length) {
            emptyState.style.display = "block";
            return;
        }

        emptyState.style.display = "none";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            const img = document.createElement("img");
            img.src = project.image || "";
            img.alt = project.title || "Project image";

            const content = document.createElement("div");
            content.className = "project-content";

            const title = document.createElement("h3");
            title.textContent = project.title || "Untitled";

            const desc = document.createElement("p");
            desc.textContent = project.description || "";

            const link = document.createElement("a");
            link.href = project.link || "#";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Watch Project";

            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(link);

            card.appendChild(img);
            card.appendChild(content);

            container.appendChild(card);
        });
    }

    renderProjects();
})();

/* =========================
   Admin Session Protection
========================= */
(function() {
    if (!window.location.pathname.includes("admin.html")) return;

    const logged = localStorage.getItem("adminLogged");

    if (logged !== "true") {
        window.location.replace("login.html");
    }
})();