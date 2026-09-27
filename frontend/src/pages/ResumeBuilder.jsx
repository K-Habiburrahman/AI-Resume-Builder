import { useState } from "react";

import ResumeForm from "../components/ResumeForm";
import ResumePreview from "./ResumePreview";

import { useResume } from "../services/ResumeContext";

function ResumeBuilder() {
  const { resume, setResume } = useResume();

  const [showTemplateModal, setShowTemplateModal] =
    useState(false);

  const changeTemplate = (template) => {
    setResume((previous) => ({
      ...previous,
      template,
    }));

    setShowTemplateModal(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "savedResume",
      JSON.stringify({
        ...resume,
        savedAt: new Date().toISOString(),
      })
    );

    alert("Resume saved successfully.");
  };

  const getTemplateName = () => {
    if (resume.template === "green") {
      return "Professional Green";
    }

    if (resume.template === "purple") {
      return "Creative Purple";
    }

    return "Modern Blue";
  };

  return (
    <div className="resume-builder">

      {/* ================= TOP SECTION ================= */}

      <div className="builder-top">

        <div className="builder-heading">

          <div>
            <h1>Resume Builder</h1>

            <p>
              Build your resume and customize its appearance.
            </p>
          </div>

          <button
            type="button"
            className="save-resume-button"
            onClick={handleSave}
          >
            Save Resume
          </button>

        </div>


        {/* ================= CURRENT TEMPLATE ================= */}

        <div className="current-template-bar">

          <div className="current-template-info">

            <span className="current-template-label">
              TEMPLATE
            </span>

            <strong>
              {getTemplateName()}
            </strong>

          </div>

          <button
            type="button"
            className="change-template-button"
            onClick={() => setShowTemplateModal(true)}
          >
            Change Template
          </button>

        </div>

      </div>


      {/* ================= TEMPLATE MODAL ================= */}

      {showTemplateModal && (
        <div
          className="template-modal-overlay"
          onClick={() => setShowTemplateModal(false)}
        >

          <div
            className="template-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="template-modal-header">

              <div>
                <span className="modal-eyebrow">
                  RESUME DESIGN
                </span>

                <h2>Choose a Template</h2>

                <p>
                  Select a layout for your resume.
                  Your information will remain unchanged.
                </p>
              </div>

              <button
                type="button"
                className="template-modal-close"
                onClick={() =>
                  setShowTemplateModal(false)
                }
                aria-label="Close template selector"
              >
                ×
              </button>

            </div>


            {/* Template Cards */}

            <div className="template-modal-options">

              {/* ================= BLUE ================= */}

              <button
                type="button"
                className={`template-modal-option ${
                  resume.template === "blue" ||
                  !resume.template
                    ? "active"
                    : ""
                }`}
                onClick={() => changeTemplate("blue")}
              >

                <div className="template-card-preview template-card-blue">

                  <div className="card-blue-sidebar">

                    <div className="card-avatar"></div>

                    <div className="card-small-line"></div>
                    <div className="card-small-line"></div>
                    <div className="card-small-line short"></div>

                    <div className="card-small-title"></div>

                    <div className="card-small-line"></div>
                    <div className="card-small-line"></div>

                  </div>

                  <div className="card-blue-main">

                    <div className="card-large-title"></div>

                    <div className="card-title-line"></div>

                    <div className="card-section-title"></div>

                    <div className="card-content-line"></div>
                    <div className="card-content-line"></div>

                    <div className="card-section-title"></div>

                    <div className="card-content-line"></div>
                    <div className="card-content-line short"></div>

                  </div>

                </div>


                <div className="template-modal-option-info">

                  <div>
                    <strong>Modern Blue</strong>

                    {(
                      resume.template === "blue" ||
                      !resume.template
                    ) && (
                      <span className="template-selected-badge">
                        Selected
                      </span>
                    )}
                  </div>

                  <p>
                    Two-column layout with a dark
                    sidebar for skills and contact details.
                  </p>

                  <div className="template-features">
                    <span>2 Columns</span>
                    <span>Bullets</span>
                    <span>Justified Text</span>
                  </div>

                </div>

              </button>


              {/* ================= GREEN ================= */}

              <button
                type="button"
                className={`template-modal-option ${
                  resume.template === "green"
                    ? "active"
                    : ""
                }`}
                onClick={() => changeTemplate("green")}
              >

                <div className="template-card-preview template-card-green">

                  <div className="card-green-header">

                    <div className="card-green-name"></div>

                    <div className="card-green-contact"></div>

                  </div>

                  <div className="card-green-content">

                    <div className="card-section-title green"></div>

                    <div className="card-content-line"></div>
                    <div className="card-content-line"></div>

                    <div className="card-section-title green"></div>

                    <div className="card-content-line"></div>
                    <div className="card-content-line short"></div>

                    <div className="card-section-title green"></div>

                    <div className="card-content-line"></div>
                    <div className="card-content-line"></div>
                    <div className="card-content-line short"></div>

                  </div>

                </div>


                <div className="template-modal-option-info">

                  <div>

                    <strong>
                      Professional Green
                    </strong>

                    {resume.template === "green" && (
                      <span className="template-selected-badge">
                        Selected
                      </span>
                    )}

                  </div>

                  <p>
                    Clean single-column layout
                    designed for structured and readable
                    resumes.
                  </p>

                  <div className="template-features">
                    <span>1 Column</span>
                    <span>ATS Style</span>
                    <span>Bullets</span>
                  </div>

                </div>

              </button>


              {/* ================= PURPLE ================= */}

              <button
                type="button"
                className={`template-modal-option ${
                  resume.template === "purple"
                    ? "active"
                    : ""
                }`}
                onClick={() => changeTemplate("purple")}
              >

                <div className="template-card-preview template-card-purple">

                  <div className="card-purple-header">

                    <div className="card-purple-name"></div>

                    <div className="card-purple-contact"></div>

                  </div>

                  <div className="card-purple-body">

                    <div className="card-purple-main">

                      <div className="card-section-title purple"></div>

                      <div className="card-content-line"></div>
                      <div className="card-content-line"></div>

                      <div className="card-section-title purple"></div>

                      <div className="card-content-line"></div>
                      <div className="card-content-line short"></div>

                    </div>

                    <div className="card-purple-sidebar">

                      <div className="card-small-title purple"></div>

                      <div className="card-small-line"></div>
                      <div className="card-small-line"></div>
                      <div className="card-small-line short"></div>

                      <div className="card-small-title purple"></div>

                      <div className="card-small-line"></div>
                      <div className="card-small-line"></div>

                    </div>

                  </div>

                </div>


                <div className="template-modal-option-info">

                  <div>

                    <strong>
                      Creative Purple
                    </strong>

                    {resume.template === "purple" && (
                      <span className="template-selected-badge">
                        Selected
                      </span>
                    )}

                  </div>

                  <p>
                    Large header with a two-column
                    body for a more creative resume.
                  </p>

                  <div className="template-features">
                    <span>2 Columns</span>
                    <span>Sidebar</span>
                    <span>Justified Text</span>
                  </div>

                </div>

              </button>

            </div>


            {/* Modal Footer */}

            <div className="template-modal-footer">

              <span>
                Select a template to apply it instantly.
              </span>

              <button
                type="button"
                onClick={() =>
                  setShowTemplateModal(false)
                }
              >
                Done
              </button>

            </div>

          </div>

        </div>
      )}


      {/* ================= BUILDER CONTENT ================= */}

      <div className="resume-builder-content">

        {/* Form */}

        <div className="builder-form">

          <ResumeForm
            resume={resume}
            setResume={setResume}
          />

        </div>


        {/* Preview */}

        <div className="builder-preview">

          <div className="preview-heading">

            <div>

              <h2>Live Preview</h2>

              <p>
                Your resume updates automatically.
              </p>

            </div>

          </div>

          <ResumePreview
            resume={resume}
            showEditButton={false}
          />

        </div>

      </div>

    </div>
  );
}

export default ResumeBuilder;