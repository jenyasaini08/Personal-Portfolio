"use strict";

// -------------------------------------
// MOBILE NAVIGATION
// -------------------------------------

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

document.addEventListener("click", (event) => {
    if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

// -------------------------------------
// DARK / LIGHT THEME
// -------------------------------------

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark", isDark);

    themeIcon.textContent = isDark ? "☀" : "◐";
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    themeColor.setAttribute(
        "content",
        isDark ? "#191a18" : "#f5f3ed"
    );
}

// Use a saved preference if one exists.
// Otherwise, follow the device's theme preference.
let savedTheme = null;

try {
    savedTheme = localStorage.getItem("jenya-theme");
} catch (error) {
    // The website still works if storage is unavailable.
}

const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";

    applyTheme(newTheme);

    try {
        localStorage.setItem("jenya-theme", newTheme);
    } catch (error) {
        // Theme changes still work for the current page.
    }
});

// -------------------------------------
// PROJECT FILTERS
// -------------------------------------

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => {
            const isActive = item === button;

            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach((card) => {
            const matches = filter === "all" ||
                card.dataset.category === filter;

            card.hidden = !matches;
        });
    });
});

// -------------------------------------
// FOOTER YEAR
// -------------------------------------

document.getElementById("year").textContent =
    new Date().getFullYear();

// -------------------------------------
// CONTACT FORM
// -------------------------------------

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

// IMPORTANT: Replace this with your real email address.
const portfolioEmail = "YOUR_EMAIL@example.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    if (
        portfolioEmail === "YOUR_EMAIL@example.com" ||
        !portfolioEmail.includes("@")
    ) {
        formNote.textContent =
            "Please configure your real email address in script.js before using this form.";

        return;
    }

    const name = document.getElementById("visitor-name").value.trim();
    const email = document.getElementById("visitor-email").value.trim();
    const message = document.getElementById("visitor-message").value.trim();

    if (!name || !email || !message) {
        formNote.textContent = "Please complete all fields.";
        return;
    }

    const subject = encodeURIComponent(
        `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formNote.textContent =
        "Opening your email application. Review the message and send it there.";

    window.location.href =
        `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});