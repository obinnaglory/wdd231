// 1. COURSE DATA (short version)
const courses = [
    { code: "WDD130", type: "wdd", credits: 3, completed: true },
    { code: "WDD131", type: "wdd", credits: 3, completed: false },
    { code: "CSE110", type: "cse", credits: 2, completed: true },
    { code: "CSE210", type: "cse", credits: 3, completed: false }
];

// 2. BUTTONS
const allBtn = document.querySelector('#all');
const wddBtn = document.querySelector('#wdd');
const cseBtn = document.querySelector('#cse');

// 3. COURSE LIST CONTAINER
const courseList = document.querySelector('#courseList');
const creditsSpan = document.querySelector('#credits');

// 4. FUNCTION: RENDER COURSES
function renderCourses(list) {
    courseList.innerHTML = ""; // clear old cards

    list.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');

        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>Type: ${course.type.toUpperCase()}</p>
            <p>Credits: ${course.credits}</p>
        `;

        courseList.appendChild(card);
    });

    // 5. REDUCE: CALCULATE TOTAL CREDITS
    const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
    creditsSpan.textContent = totalCredits;
}

// 6. FILTER BUTTONS
allBtn.addEventListener('click', () => {
    renderCourses(courses);
});

wddBtn.addEventListener('click', () => {
    const filtered = courses.filter(course => course.type === "wdd");
    renderCourses(filtered);
});

cseBtn.addEventListener('click', () => {
    const filtered = courses.filter(course => course.type === "cse");
    renderCourses(filtered);
});

// 7. INITIAL LOAD
renderCourses(courses);