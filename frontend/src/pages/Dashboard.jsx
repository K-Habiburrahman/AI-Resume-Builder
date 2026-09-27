import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { importResume } from "../services/api";
import { useResume } from "../services/ResumeContext";

function Dashboard() {
  const navigate = useNavigate();

  const {
    savedResumes,
    createNewResume,
    setResume,
    openResume,
  } = useResume();

  const fileInputRef = useRef(null);

  const [importing, setImporting] = useState(false);

  const handleNewResume = () => {
    createNewResume();
    navigate("/resume");
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setImporting(true);

    try {
      const result = await importResume(file);

      if (!result.success) {
        alert(
          result.message ||
          "Could not import resume."
        );
        return;
      }

      setResume({
        ...result.resume,
        id: Date.now().toString(),
        template: "blue",
        saved: false,
        updatedAt: "",
      });

      navigate("/resume");

    } catch (error) {
      alert(
        "Could not import the resume. Make sure the backend is running."
      );
    } finally {
      setImporting(false);
      event.target.value = "";
    }
  };

  const handleOpenResume = (savedResume) => {
    openResume(savedResume);
    navigate("/preview");
  };

  return (
    <div className="dashboard">

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleImport}
        hidden
      />

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Home</h1>

          <p>
            Create, import and manage your resumes.
          </p>
        </div>

        <button
          className="dashboard-interview-button"
          onClick={() => navigate("/interview")}
        >
          Mock Interview
        </button>
      </div>


      {/* Start a new resume */}
      <section className="dashboard-section">

        <h2>Start a new resume</h2>

        <div className="resume-start-grid">

          {/* New Resume */}
          <div
            className="resume-action-card"
            onClick={handleNewResume}
          >
            <div className="action-icon new-icon">
              +
            </div>

            <div>
              <h3>New Resume</h3>

              <p>
                Start with a blank resume and
                enter your information.
              </p>
            </div>
          </div>


          {/* Import Resume */}
          <div
            className="resume-action-card"
            onClick={handleImportClick}
          >
            <div className="action-icon import-icon">
              ↑
            </div>

            <div>
              <h3>
                {importing
                  ? "Importing..."
                  : "Import Resume"}
              </h3>

              <p>
                Import an existing PDF, DOCX or
                TXT resume and edit it.
              </p>
            </div>
          </div>


          {/* Templates */}
          <div
            className="resume-action-card"
            onClick={() => navigate("/templates")}
          >
            <div className="action-icon template-icon">
              ▤
            </div>

            <div>
              <h3>Templates</h3>

              <p>
                Choose from different resume
                colors and styles.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* Recent Resumes */}
      <section className="dashboard-section recent-section">

        <div className="section-heading">

          <div>
            <h2>Recent resumes</h2>

            <p>
              Your saved resumes.
            </p>
          </div>

          <div className="view-controls">

            <button type="button" title="Grid view">
              ▦
            </button>

            <button type="button" title="List view">
              ☰
            </button>

            <button type="button" title="Sort">
              ⇅
            </button>

          </div>

        </div>


        {savedResumes.length === 0 ? (

          <div className="empty-resumes">

            <h3>No saved resumes yet</h3>

            <p>
              Create a resume and click
              "Save Resume" to see it here.
            </p>

          </div>

        ) : (

          <div className="recent-resumes">

            {savedResumes.map((savedResume) => (

              <div
                className="recent-resume-card"
                key={savedResume.id}
              >

                <div className="resume-thumbnail">

                  <div className="thumbnail-line large"></div>
                  <div className="thumbnail-line"></div>
                  <div className="thumbnail-line"></div>

                  <div className="thumbnail-section"></div>

                  <div className="thumbnail-line"></div>
                  <div className="thumbnail-line short"></div>

                  <div className="thumbnail-section"></div>

                  <div className="thumbnail-line"></div>
                  <div className="thumbnail-line"></div>

                </div>


                <div className="recent-resume-info">

                  <h3>
                    {savedResume.name ||
                      "Untitled Resume"}
                  </h3>

                  <p>
                    Saved{" "}
                    {savedResume.updatedAt
                      ? new Date(
                          savedResume.updatedAt
                        ).toLocaleDateString()
                      : ""}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenResume(savedResume)
                    }
                  >
                    Open
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* Mock Interview */}
      <section className="dashboard-interview">

        <div>

          <span className="interview-label">
            PRACTICE
          </span>

          <h2>
            Mock Interview
          </h2>

          <p>
            Practice exactly 10 technical
            interview questions based on your resume.
          </p>

        </div>

        <button
          type="button"
          onClick={() => navigate("/interview")}
        >
          Start Interview →
        </button>

      </section>

    </div>
  );
}

export default Dashboard;