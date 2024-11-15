document.addEventListener("DOMContentLoaded", () => {
    loadMembers();
    setupViewToggle();
    displayFooterInfo();
});

async function loadMembers() {
    try {
        const response = await fetch('scripts/members.json');
        const members = await response.json();
        displayMembers(members, "grid");
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
            <img src="images/${member.image}" alt="${member.name}">
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
    const toggleButton = document.getElementById("toggle-view");
    toggleButton.addEventListener("click", () => {
        const container = document.getElementById("members-container");
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
    const yearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified");

    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;
}
