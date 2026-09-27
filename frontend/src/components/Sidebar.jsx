import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>ResumeAI</h2>
        <p>AI Career Assistant</p>
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/resume">Resume Builder</NavLink>
        <NavLink to="/preview">Resume Preview</NavLink>
        <NavLink to="/interview">Mock Interview</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;