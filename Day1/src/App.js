import React, { useState } from "react";
import StudentCard from "./components/StudentCard";

function App() {
  const [inputValue, setInputValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    course: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "300px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          marginTop: "20px",
          textAlign: "center"
        }}
      >
        <h3>Input Section</h3>

        <input
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: "90%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={() => console.log(inputValue)}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#667eea",
            color: "white",
            cursor: "pointer",
            marginTop: "15px"
          }}
          onMouseOver={(e) => (e.target.style.background = "#5a67d8")}
          onMouseOut={(e) => (e.target.style.background = "#667eea")}
        >
          Submit
        </button>
      </div>

      {/* Form Section */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "300px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          marginTop: "20px",
          textAlign: "center"
        }}
      >
        <h3>Student Form</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}   // ✅ controlled input
          onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="text"
          name="course"
          placeholder="Enter your course"
          value={formData.course}   // ✅ controlled input
          onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={() => {
            console.log(formData);

            // 🔥 Reset form after submit
            setFormData({
              name: "",
              course: ""
            });
          }}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#2ecc71",
            color: "white",
            cursor: "pointer",
            marginTop: "15px"
          }}
          onMouseOver={(e) => (e.target.style.background = "#27ae60")}
          onMouseOut={(e) => (e.target.style.background = "#2ecc71")}
        >
          Submit Form
        </button>

        {/* Output */}
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          {formData.name && `${formData.name} - ${formData.course}`}
        </p>
      </div>
    </div>
  );
}

export default App;