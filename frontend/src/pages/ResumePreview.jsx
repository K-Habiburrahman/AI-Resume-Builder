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

      {template !== "green" &&
        template !== "purple" && (
          <BlueTemplate />
        )}

    </div>
  );
}

export default ResumePreview;