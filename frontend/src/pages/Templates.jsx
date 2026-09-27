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

      </div>
    </div>
  );
}

export default Templates;
