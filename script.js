// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

const form = document.getElementById("studentForm");
const list = document.getElementById("studentsList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearAll");

let students = JSON.parse(localStorage.getItem("students")) || [];

function updateUI() {
    list.innerHTML = "";

    if (students.length === 0) {
        list.innerHTML = "<p>No student records added yet.</p>";
    }

    students.forEach((s) => {
        const div = document.createElement("div");
        div.innerHTML =
            `<strong>${s.name}</strong><br>
            ${s.email} | ${s.phone}<br>
            ${s.course} | Marks: ${s.marks}<hr>`;
        list.appendChild(div);
    });

    count.textContent = students.length;
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const student = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        course: course.value,
        marks: marks.value
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    updateUI();
});

clearBtn.addEventListener("click", () => {
    students = [];
    localStorage.removeItem("students");
    updateUI();
});

updateUI();
