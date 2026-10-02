import { useNavigate } from "react-router-dom";
import { useResume } from "../services/ResumeContext";

function Templates() {
  const navigate = useNavigate();
  const { changeTemplate } = useResume();

  const selectTemplate = (template) => {
    changeTemplate(template);
    navigate("/resume");
  };

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>Choose a Resume Template</h1>
        <p>
          Choose a layout and color style for your resume.
        </p>
      </div>

      <div className="template-grid">

        {/* RED-VIOLET */}
        <div className="template-card">
          <div className="template-card-preview blue-card">
            <div className="mini-blue-sidebar">
              <div className="mini-circle"></div>
              <div className="mini-white-line"></div>
              <div className="mini-white-line"></div>
              <div className="mini-white-line short"></div>
            </div>

            <div className="mini-blue-content">
              <div className="mini-heading"></div>
              <div className="mini-line"></div>
              <div className="mini-line"></div>
              <div className="mini-heading small"></div>
              <div className="mini-line"></div>
              <div className="mini-line short"></div>
            </div>
          </div>

          <h3>Red-Violet</h3>
          <p>Two-column professional layout.</p>

          <button
            type="button"
            onClick={() => selectTemplate("blue")}
          >
            Use Template
          </button>
        </div>

        {/* BISTRE BROWN */}
        <div className="template-card">
          <div className="template-card-preview green-card">
            <div className="mini-green-header">
              <div className="mini-green-name"></div>
              <div className="mini-green-contact"></div>
            </div>

            <div className="mini-green-content">
              <div className="mini-heading green"></div>
              <div className="mini-line"></div>
              <div className="mini-line"></div>
              <div className="mini-heading green small"></div>
              <div className="mini-line"></div>
              <div className="mini-line short"></div>
            </div>
          </div>

          <h3>Bistre Brown</h3>
          <p>Traditional single-column layout.</p>

          <button
            type="button"
            onClick={() => selectTemplate("green")}
          >
            Use Template
          </button>
        </div>

        {/* WHITE CHOCOLATE */}
        <div className="template-card">
          <div className="template-card-preview purple-card">
            <div className="mini-purple-header">
              <div className="mini-purple-name"></div>
              <div className="mini-purple-contact"></div>
            </div>

            <div className="mini-purple-body">
              <div className="mini-purple-main">
                <div className="mini-heading purple"></div>
                <div className="mini-line"></div>
                <div className="mini-line"></div>
                <div className="mini-heading purple small"></div>
                <div className="mini-line"></div>
              </div>

              <div className="mini-purple-sidebar">
                <div className="mini-heading purple"></div>
                <div className="mini-line"></div>
                <div className="mini-line short"></div>
              </div>
            </div>
          </div>

          <h3>White Chocolate</h3>
          <p>Creative two-column layout.</p>

          <button
            type="button"
            onClick={() => selectTemplate("purple")}
          >
            Use Template
          </button>
        </div>

        {/* ATS FRIENDLY */}
        <div className="template-card">
          <div
            className="template-card-preview"
            style={{
              background: "#ffffff",
              border: "1px solid #111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              boxShadow: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "36%",
                  height: "8px",
                  background: "#111111",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  width: "72%",
                  height: "6px",
                  background: "#222222",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  width: "82%",
                  height: "6px",
                  background: "#444444",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  width: "52%",
                  height: "6px",
                  background: "#666666",
                  borderRadius: "999px",
                  marginTop: "4px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "#111111",
                  margin: "6px 0",
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: "6px",
                  background: "#111111",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  width: "78%",
                  height: "6px",
                  background: "#333333",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  width: "68%",
                  height: "6px",
                  background: "#555555",
                  borderRadius: "999px",
                }}
              />
            </div>
          </div>

          <h3>ATS Friendly</h3>
          <p>Clean, simple, and recruiter-friendly layout.</p>

          <button
            type="button"
            onClick={() => selectTemplate("ats")}
          >
            Use Template
          </button>
        </div>

      </div>
    </div>
  );
}

export default Templates;
