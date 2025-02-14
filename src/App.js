// Folder Structure
// /webform-project
// ├── /src
// │   ├── /components
// │   │   ├── InputField.jsx
// │   │   ├── SelectField.jsx
// │   │   ├── Button.jsx
// │   ├── /pages
// │   │   ├── WebForm.jsx
// │   ├── App.js
// │   ├── main.jsx
// ├── public/index.html
// ├── package.json
// ├── tailwind.config.js

// App.js
import React from "react";
import WebForm from "./pages/WebForm";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./styles/global.css";

export default function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
    <WebForm />
  </div>
  );
}
