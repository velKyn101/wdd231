document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;

    // Load and display courses
    loadCourses();

    document.querySelector('.hamburger').addEventListener('click', function() {
        this.classList.toggle('change');
        document.querySelector('.nav-menu').classList.toggle('show');
        x.classList.toggle("change");
    });
    
});

// Course data
const courses = [
    { code: "CSE 110", name: "Intro to Programming", credits: 3, type: "CSE", completed: true },
    { code: "WDD 130", name: "Web Design Basics", credits: 3, type: "WDD", completed: true },
    { code: "CSE 111", name: "Data Structures", credits: 3, type: "CSE", completed: true },
    { code: "CSE 210", name: "Software Engineering", credits: 3, type: "CSE", completed: true },
    { code: "WDD 131", name: "Advanced Web Design", credits: 3, type: "WDD", completed: true },
    { code: "WDD 231", name: "JavaScript Development", credits: 3, type: "WDD", completed: false }
];

// Filter and display courses
function filterCourses(filter) {
    const filteredCourses = courses.filter(course => filter === "all" || course.type === filter);
    displayCourses(filteredCourses);
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("totalCredits").textContent = totalCredits;
}

// Load all courses by default
function loadCourses() {
    filterCourses('all');
}

// Display courses dynamically
function displayCourses(courseList) {
    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = "";

    courseList.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.className = `course ${course.completed ? "completed" : "incomplete"}`;
        courseDiv.textContent = `${course.code}`;
        coursesContainer.appendChild(courseDiv);
    });
}
