document.addEventListener("DOMContentLoaded", () => {
    loadMembers();
    setupViewToggle();
    displayFooterInfo();
    setupThemeToggle(); // New addition
});

function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
    }

    themeToggle.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    });
}

async function loadMembers() {
    try {
        const response = await fetch('scripts/members.json');
        const members = await response.json();

        // Filter gold and silver members
        const filteredMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

        // Randomly select 2-3 members
        const selectedMembers = filteredMembers.sort(() => Math.random() - 0.5).slice(0, 3);

        displayMembers(selectedMembers, "grid");
    } catch (error) {
        console.error("Error loading member data:", error);
    }
}

function displayMembers(members, viewType) {
    const container = document.getElementById("members-container");
    container.innerHTML = "";

    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card", viewType);

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>Membership Level: ${getMembershipLevel(member.membership_level)}</p>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        container.appendChild(memberCard);
    });
}

function getMembershipLevel(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown";
    }
}

function setupViewToggle() {
    const toggleButton = document.getElementById("toggleView");
    const container = document.getElementById("members-container");

    if (!toggleButton || !container) {
        console.error("Toggle button or members container not found.");
        return;
    }

    // Set the initial state of the button and the container
    container.classList.add("grid");
    toggleButton.textContent = "Switch to List View";

    toggleButton.addEventListener("click", () => {
        if (container.classList.contains("grid")) {
            container.classList.remove("grid");
            container.classList.add("list");
            toggleButton.textContent = "Switch to Grid View";
        } else {
            container.classList.remove("list");
            container.classList.add("grid");
            toggleButton.textContent = "Switch to List View";
        }
    });
}

function displayFooterInfo() {
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}
