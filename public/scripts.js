document.getElementById('studentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;

    await fetch('http://127.0.0.1:8080/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, email }),
    });

    loadStudents();
});

async function loadStudents() {
    const response = await fetch('http://127.0.0.1:8080/students');
    const students = await response.json();
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name} (${student.age}) - ${student.email}`;
        studentList.appendChild(li);
    });
}

loadStudents();
