// Example course array
const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Frontend Development I", credits: 3, completed: false },
    { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 3, completed: false }
];

const courseContainer = document.createElement("div");
courseContainer.id = "courseContainer";
document.querySelector("main").appendChild(courseContainer);

function renderCourses(list) {
    courseContainer.innerHTML = "";
    let totalCredits = list.reduce((sum, course) => sum + course.credits, 0);

    list.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p>Status: ${course.completed ? "✅ Completed" : "❌ Not Completed"}</p>
    `;
        if (course.completed) {
            card.style.backgroundColor = "#d4edda"; // greenish for completed
        } else {
            card.style.backgroundColor = "#f8d7da"; // reddish for not completed
        }
        courseContainer.appendChild(card);
    });

    const creditsDisplay = document.createElement("p");
    creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
    courseContainer.appendChild(creditsDisplay);
}

// Initial render
renderCourses(courses);

// Example filter buttons
const allBtn = document.createElement("button");
allBtn.textContent = "All Courses";
allBtn.onclick = () => renderCourses(courses);

const wddBtn = document.createElement("button");
wddBtn.textContent = "WDD Courses";
wddBtn.onclick = () => renderCourses(courses.filter(c => c.code.startsWith("WDD")));

const cseBtn = document.createElement("button");
cseBtn.textContent = "CSE Courses";
cseBtn.onclick = () => renderCourses(courses.filter(c => c.code.startsWith("CSE")));

document.querySelector("main").prepend(allBtn, wddBtn, cseBtn);
