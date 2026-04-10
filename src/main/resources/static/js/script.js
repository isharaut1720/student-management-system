let editingId = null;

// Railway backend URL
const BASE_URL = "https://student-management-system-production-a469.up.railway.app";


// Load students
function loadStudents() {
    fetch(BASE_URL + "/students")
    .then(res => res.json())
    .then(data => {
        let table = "";
        data.forEach((s, index) => {
            table += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>
                        <button onclick="editStudent(${s.id}, '${s.name}', '${s.email}', '${s.course}')">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById("studentTable").innerHTML = table;
    });
}


// Add OR Update student
function addStudent() {

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    // Validation
    if (!student.name || !student.email || !student.course) {
        alert("Please fill all fields");
        return;
    }

    // UPDATE
    if (editingId !== null) {
        fetch(`${BASE_URL}/students/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            showMessage("Student updated successfully!");
            editingId = null;
            clearForm();
            loadStudents();
        });
    } 
    // ADD
    else {
        fetch(BASE_URL + "/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            showMessage("Student added successfully!");
            clearForm();
            loadStudents();
        });
    }
}


// Edit student
function editStudent(id, name, email, course) {
    editingId = id;

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("course").value = course;

    document.getElementById("submitBtn").innerText = "Update Student";
}


// Delete student
function deleteStudent(id) {
    if (!confirm("Are you sure?")) return;

    fetch(BASE_URL + "/students/" + id, {
        method: "DELETE"
    }).then(() => {
        showMessage("Student deleted!");
        loadStudents();
    });
}


// Clear form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";

    document.getElementById("submitBtn").innerText = "Add Student";
}


// Show message
function showMessage(text) {
    document.getElementById("message").innerText = text;

    setTimeout(() => {
        document.getElementById("message").innerText = "";
    }, 2000);
}


// Auto load
loadStudents();