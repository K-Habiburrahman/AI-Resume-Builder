import { useNavigate } from "react-router-dom";

import { useResume } from "../services/ResumeContext";

function ResumePreview({ showEditButton = true, resume: previewResume }) {

  const navigate = useNavigate();

  const { resume: contextResume } = useResume();

  const resume = previewResume || contextResume;

  const template = resume.template || "blue";

  const name = resume.name || "Your Name";

  const email = resume.email || "email@example.com";

  const phone = resume.phone || "Phone Number";

  const location = resume.location || "Location";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /*
   * Converts multiline text into bullet points.
   *
   * Example:
   *
   * Python
   * React
   * Linux
   *
   * becomes:
   *
   * • Python
   * • React
   * • Linux
   */
  const getLines = (text) => {
    if (!text) {
      return [];
    }

    return text
      .split(/\n|•/)
      .map((line) => line.trim())
      .filter(Boolean);
  };

  const renderBullets = (text) => {
    const lines = getLines(text);

    if (!lines.length) {
      return null;
    }

    return (
      <ul className="resume-bullet-list">
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    );
  };

  const renderParagraph = (text, fallback = "") => {
    if (!text && !fallback) {
      return null;
    }

    return (
      <p className="resume-justified-text">
        {text || fallback}
      </p>
    );
  };

  /*
   * MODERN BLUE
   *
   * Two-column layout.
   */

  const BlueTemplate = () => (
    <div className="resume-template resume-template-blue">

      <aside className="template-sidebar">

        <div className="template-profile">
          <div className="template-avatar">
            {initials}
          </div>

          <h2>{name}</h2>

          <p>
            Computer Engineering Student
          </p>
        </div>

        <div className="template-sidebar-section">

          <h3>CONTACT</h3>

          <p>{email}</p>
          <p>{phone}</p>
          <p>{location}</p>

        </div>

        <div className="template-sidebar-section">

          <h3>SKILLS</h3>

          {renderBullets(resume.skills)}

        </div>

        <div className="template-sidebar-section">

          <h3>CERTIFICATIONS</h3>

          {renderBullets(resume.certifications)}

        </div>

      </aside>

      <main className="template-main">

        <header className="blue-main-header">

          <h1>{name}</h1>

          <p>
            {email}
            {" • "}
            {phone}
            {" • "}
            {location}
          </p>

        </header>

        {resume.summary && (
          <section className="resume-section">

            <h2>Professional Summary</h2>

            {renderParagraph(resume.summary)}

          </section>
        )}

        {resume.education && (
          <section className="resume-section">

            <h2>Education</h2>

            {renderParagraph(resume.education)}

          </section>
        )}

        {resume.projects && (
          <section className="resume-section">

            <h2>Projects</h2>

            {renderBullets(resume.projects)}

          </section>
        )}

        {resume.experience && (
          <section className="resume-section">

            <h2>Experience</h2>

            {renderParagraph(resume.experience)}

          </section>
        )}

      </main>

    </div>
  );

  /*
   * PROFESSIONAL GREEN
   *
   * Single-column ATS-friendly layout.
   */

  const GreenTemplate = () => (
    <div className="resume-template resume-template-green">

      <header className="green-header">

        <h1>{name}</h1>

        <p>
          {email}
          {" | "}
          {phone}
          {" | "}
          {location}
        </p>

      </header>

      <main className="green-content">

        {resume.summary && (
          <section className="green-section">

            <h2>Professional Summary</h2>

            {renderParagraph(resume.summary)}

          </section>
        )}

        {resume.education && (
          <section className="green-section">

            <h2>Education</h2>

            {renderParagraph(resume.education)}

          </section>
        )}

        {resume.skills && (
          <section className="green-section">

            <h2>Skills</h2>

            {renderBullets(resume.skills)}

          </section>
        )}

        {resume.projects && (
          <section className="green-section">

            <h2>Projects</h2>

            {renderBullets(resume.projects)}

          </section>
        )}

        {resume.experience && (
          <section className="green-section">

            <h2>Experience</h2>

            {renderParagraph(resume.experience)}

          </section>
        )}

        {resume.certifications && (
          <section className="green-section">

            <h2>Certifications & Achievements</h2>

            {renderBullets(resume.certifications)}

          </section>
        )}

      </main>

    </div>
  );

  /*
   * CREATIVE PURPLE
   *
   * Large header + two-column body.
   */

  const PurpleTemplate = () => (
    <div className="resume-template resume-template-purple">

      <header className="purple-header">

        <div>

          <h1>{name}</h1>

          <p>
            Computer Engineering Student
          </p>

        </div>

        <div className="purple-contact">

          <span>{email}</span>
          <span>{phone}</span>
          <span>{location}</span>

        </div>

      </header>

      <div className="purple-body">

        <main className="purple-main">

          {resume.summary && (
            <section className="purple-section">

              <h2>Professional Summary</h2>

              {renderParagraph(resume.summary)}

            </section>
          )}

          {resume.experience && (
            <section className="purple-section">

              <h2>Experience</h2>

              {renderParagraph(resume.experience)}

            </section>
          )}

          {resume.projects && (
            <section className="purple-section">

              <h2>Projects</h2>

              {renderBullets(resume.projects)}

            </section>
          )}

          {resume.education && (
            <section className="purple-section">

              <h2>Education</h2>

              {renderParagraph(resume.education)}

            </section>
          )}

        </main>

        <aside className="purple-sidebar">

          {resume.skills && (
            <section className="purple-sidebar-section">

              <h3>SKILLS</h3>

              {renderBullets(resume.skills)}

            </section>
          )}

          {resume.certifications && (
            <section className="purple-sidebar-section">

              <h3>CERTIFICATIONS</h3>

              {renderBullets(resume.certifications)}

            </section>
          )}

          <section className="purple-sidebar-section">

            <h3>CONTACT</h3>

            <p>{email}</p>
            <p>{phone}</p>
            <p>{location}</p>

          </section>

        </aside>

      </div>

    </div>
  );

  const AtsTemplate = () => (
    <div
      className="resume-template"
      style={{
        background: "#ffffff",
        color: "#111111",
        border: "1px solid #111111",
        padding: "28px 30px",
        boxShadow: "none",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: "18px" }}>
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 700, letterSpacing: "0.04em" }}>{name}</h1>
        <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#222222" }}>
          {email} • {phone} • {location}
        </p>
      </header>

      <div style={{ height: "1px", background: "#111111", margin: "12px 0 18px" }} />

      <main>
        {resume.summary && (
          <section style={{ marginBottom: "18px" }}>
            <h2 style={{ margin: 0, marginBottom: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Professional Summary</h2>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "14px" }}>{resume.summary}</p>
          </section>
        )}

        {resume.experience && (
          <section style={{ marginBottom: "18px" }}>
            <h2 style={{ margin: 0, marginBottom: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Experience</h2>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "14px" }}>{resume.experience}</p>
          </section>
        )}

        {resume.education && (
          <section style={{ marginBottom: "18px" }}>
            <h2 style={{ margin: 0, marginBottom: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Education</h2>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "14px" }}>{resume.education}</p>
          </section>
        )}

        {resume.skills && (
          <section style={{ marginBottom: "18px" }}>
            <h2 style={{ margin: 0, marginBottom: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Skills</h2>
            <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8, fontSize: "14px" }}>
              {getLines(resume.skills).map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {resume.projects && (
          <section style={{ marginBottom: "18px" }}>
            <h2 style={{ margin: 0, marginBottom: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Projects</h2>
            <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8, fontSize: "14px" }}>
              {getLines(resume.projects).map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {resume.certifications && (
          <section>
            <h2 style={{ margin: 0, marginBottom: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Certifications</h2>
            <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8, fontSize: "14px" }}>
              {getLines(resume.certifications).map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );

  return (
    <div className="resume-preview-wrapper">

      {showEditButton && (
        <div className="resume-preview-actions">

          <button
            type="button"
            onClick={() => navigate("/resume")}
          >
            Edit Resume
          </button>

        </div>
      )}

      {template === "green" && <GreenTemplate />}

      {template === "purple" && <PurpleTemplate />}

      {template === "ats" && <AtsTemplate />}

      {template !== "green" &&
        template !== "purple" &&
        template !== "ats" && (
          <BlueTemplate />
        )}

    </div>
  );
}

export default ResumePreview;