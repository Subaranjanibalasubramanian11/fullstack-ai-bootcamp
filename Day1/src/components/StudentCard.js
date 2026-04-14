import React from "react";

function StudentCard({ name, course, status }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        marginTop: "20px"
      }}
    >
      <h2>{name}</h2>
      <p><strong>Course:</strong> {course}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}

export default StudentCard;