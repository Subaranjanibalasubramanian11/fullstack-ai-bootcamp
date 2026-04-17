import React, { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: ""
  });

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  /* ---------------- ADD USER ---------------- */
  const handleAdd = async () => {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "New User",
        email: "new@gmail.com"
      })
    });

    const data = await res.json();
    setStudents([...students, data]);

    setMessage("✅ User Added!");
    setTimeout(() => setMessage(""), 2000);
  };

  /* ---------------- OPEN MODAL ---------------- */
  const handleUpdate = (id) => {
    const user = students.find(u => u._id === id);

    setSelectedId(id);
    setEditData({
      name: user.name,
      email: user.email
    });

    setShowModal(true);
  };

  /* ---------------- SUBMIT UPDATE ---------------- */
  const submitUpdate = async () => {
    await fetch(`http://localhost:3000/users/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    });

    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setStudents(data);

    setShowModal(false);
    setEditData({ name: "", email: "" });

    setMessage("✏️ Updated Successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "test@gmail.com"
      })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    setMessage("🔐 Login Successful!");
    setTimeout(() => setMessage(""), 2000);
  };

  /* ---------------- PROFILE ---------------- */
  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(data);

    setMessage("👀 Check Console!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={mainContainer}>
      <h1 style={title}>🎓 Student Dashboard</h1>

      {/* Popup */}
      {message && <div style={popupStyle}>{message}</div>}

      {/* Profile */}
      <div style={profileCard}>
        <h2>Subaranjani</h2>
        <p>🚀 Full Stack Developer</p>
        <span style={status}>● Active</span>
      </div>

      {/* Buttons */}
      <div style={buttonGroup}>
        <button style={btn} onClick={handleAdd}>➕ Add User</button>
        <button style={btn} onClick={handleLogin}>🔐 Login</button>
        <button style={btn} onClick={getProfile}>👤 Profile</button>
      </div>

      <h2 style={{ marginTop: "40px" }}>👥 Users</h2>

      {/* Users */}
      <div style={grid}>
        {students.map((user) => (
          <div key={user._id} style={userCard}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>

            <button
              style={updateBtn}
              onClick={() => handleUpdate(user._id)}
            >
              ✏️ Update
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h2>✏️ Update User</h2>

            <input
              type="text"
              placeholder="Enter Name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              style={input}
            />

            <input
              type="text"
              placeholder="Enter Email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              style={input}
            />

            <div>
              <button style={btn} onClick={submitUpdate}>Save</button>
              <button style={btn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const mainContainer = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "30px",
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  color: "white"
};

const title = {
  fontSize: "32px"
};

const profileCard = {
  background: "rgba(255,255,255,0.15)",
  padding: "20px",
  borderRadius: "15px",
  width: "300px",
  margin: "20px auto"
};

const status = {
  color: "#2ecc71"
};

const buttonGroup = {
  marginTop: "20px"
};

const btn = {
  margin: "10px",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "30px"
};

const userCard = {
  background: "white",
  color: "black",
  padding: "15px",
  borderRadius: "10px"
};

const updateBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const popupStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#2ecc71",
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  color: "black",
  width: "300px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

const input = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  color: "black"
};

export default App;