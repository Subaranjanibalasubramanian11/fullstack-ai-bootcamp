import React, { useState, useEffect } from "react";
import StudentCard from "./components/StudentCard";

function App() {
  const [inputValue, setInputValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    course: ""
  });

  // 🔵 Day2 - Student List
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", course: "React" },
    { id: 2, name: "Priya", course: "Node" },
    { id: 3, name: "Rahul", course: "Python" },
    { id: 4, name: "Sneha", course: "Java" },
    { id: 5, name: "Kiran", course: "AI" }
  ]);

  // 🟣 Day2 - API Users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🟢 Add student dynamically
  const handleSubmit = () => {
    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      course: formData.course
    };

    setStudents([...students, newStudent]);

    setFormData({
      name: "",
      course: ""
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ color: "white" }}>🎓 Student Dashboard</h1>

      {/* Student Card */}
      <StudentCard
        name="Subaranjani"
        course="Full Stack Development"
        status="Active"
      />

      {/* Input Section */}
      <div style={cardStyle}>
        <h3>Input Section</h3>

        <input
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={() => console.log(inputValue)}
          style={blueBtn}
        >
          Submit
        </button>
      </div>

      {/* Form Section */}
      <div style={cardStyle}>
        <h3>Student Form</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="course"
          placeholder="Enter your course"
          value={formData.course}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={greenBtn}>
          Add Student
        </button>
      </div>

      {/* 🔵 Student List */}
      <div style={cardStyle}>
        <h3>Student List</h3>

        {students.map((student) => (
          <p key={student.id}>
            {student.name} - {student.course}
          </p>
        ))}
      </div>

      {/* 🟣 API Users */}
      <div style={cardStyle}>
        <h3>API Users</h3>

        {users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}

// 🎨 Styles (clean UI)
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "300px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  marginTop: "20px",
  textAlign: "center"
};

const inputStyle = {
  width: "90%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const blueBtn = {
  padding: "8px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#667eea",
  color: "white",
  cursor: "pointer",
  marginTop: "15px"
};

const greenBtn = {
  padding: "8px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#2ecc71",
  color: "white",
  cursor: "pointer",
  marginTop: "15px"
};

export default App;