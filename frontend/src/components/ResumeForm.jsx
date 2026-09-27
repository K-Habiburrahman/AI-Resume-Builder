import { useRef, useState } from "react";

import { importResume } from "../services/api";


function ResumeForm({ resume, setResume }) {

  const [errors, setErrors] = useState({});

  const [importing, setImporting] = useState(false);

  const [importMessage, setImportMessage] = useState("");

  const fileInputRef = useRef(null);


  // -----------------------------------------
  // NORMAL INPUT
  // -----------------------------------------

  const handleChange = (event) => {

    const { name, value } = event.target;

    let newValue = value;


    if (name === "name") {

      newValue = value.replace(
        /[^a-zA-Z\s]/g,
        ""
      );
    }


    if (name === "phone") {

      newValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }


    setResume((previous) => ({
      ...previous,
      [name]: newValue,
    }));


    if (errors[name]) {

      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };


  // -----------------------------------------
  // IMPORT RESUME
  // -----------------------------------------

  const handleImport = async (event) => {

    const file = event.target.files[0];

    if (!file) {
      return;
    }


    setImporting(true);

    setImportMessage("");

    setErrors({});


    try {

      const result = await importResume(file);


      if (!result.success) {

        setImportMessage(
          result.message ||
          "Could not import resume."
        );

        return;
      }


      setResume(result.resume);


      setImportMessage(
        "Resume imported successfully. Please review the extracted information."
      );

    } catch (error) {

      setImportMessage(
        "Could not import the resume. Make sure the backend is running."
      );

    } finally {

      setImporting(false);

      event.target.value = "";
    }
  };


  // -----------------------------------------
  // VALIDATION
  // -----------------------------------------

  const validate = () => {

    const newErrors = {};


    if (!resume.name.trim()) {

      newErrors.name =
        "Full name is required.";

    } else if (
      resume.name.trim().length < 3
    ) {

      newErrors.name =
        "Name must contain at least 3 characters.";
    }


    if (!resume.email.trim()) {

      newErrors.email =
        "Email address is required.";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        resume.email
      )
    ) {

      newErrors.email =
        "Enter a valid email address.";
    }


    if (!resume.phone.trim()) {

      newErrors.phone =
        "Phone number is required.";

    } else if (
      !/^\d{10}$/.test(resume.phone)
    ) {

      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }


    if (!resume.location.trim()) {

      newErrors.location =
        "Location is required.";
    }


    if (!resume.education.trim()) {

      newErrors.education =
        "Education details are required.";
    }


    if (!resume.skills.trim()) {

      newErrors.skills =
        "At least one skill is required.";
    }


    if (!resume.projects.trim()) {

      newErrors.projects =
        "At least one project is required.";
    }


    if (!resume.certifications.trim()) {

      newErrors.certifications =
        "At least one certification or achievement is required.";
    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  // -----------------------------------------
  // SUBMIT
  // -----------------------------------------

  const handleSubmit = (event) => {

    event.preventDefault();

    if (validate()) {

      alert(
        "Resume information is valid."
      );
    }
  };


  return (

    <form
      className="resume-form"
      onSubmit={handleSubmit}
    >

      {/* -------------------------------- */}
      {/* IMPORT RESUME */}
      {/* -------------------------------- */}

      <div className="resume-import">

        <h2>Import Existing Resume</h2>

        <p>
          Upload an old resume and automatically
          fill the form.
        </p>


        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleImport}
          hidden
        />


        <button
          type="button"
          className="import-button"
          onClick={() =>
            fileInputRef.current.click()
          }
          disabled={importing}
        >

          {importing
            ? "Importing Resume..."
            : "Import Resume"}

        </button>


        {importMessage && (

          <p className="import-message">
            {importMessage}
          </p>

        )}

      </div>


      {/* -------------------------------- */}
      {/* PERSONAL INFORMATION */}
      {/* -------------------------------- */}

      <h2>Personal Information</h2>


      <input
        name="name"
        placeholder="Full Name"
        value={resume.name}
        onChange={handleChange}
        className={
          errors.name
            ? "input-error"
            : ""
        }
      />

      {errors.name && (
        <p className="validation-error">
          {errors.name}
        </p>
      )}


      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={resume.email}
        onChange={handleChange}
        className={
          errors.email
            ? "input-error"
            : ""
        }
      />

      {errors.email && (
        <p className="validation-error">
          {errors.email}
        </p>
      )}


      <input
        name="phone"
        placeholder="Phone Number"
        value={resume.phone}
        onChange={handleChange}
        className={
          errors.phone
            ? "input-error"
            : ""
        }
        maxLength={10}
      />

      {errors.phone && (
        <p className="validation-error">
          {errors.phone}
        </p>
      )}


      <input
        name="location"
        placeholder="City, State, Country"
        value={resume.location}
        onChange={handleChange}
        className={
          errors.location
            ? "input-error"
            : ""
        }
      />

      {errors.location && (
        <p className="validation-error">
          {errors.location}
        </p>
      )}


      {/* -------------------------------- */}
      {/* SUMMARY */}
      {/* -------------------------------- */}

      <h2>Professional Summary</h2>


      <textarea
        name="summary"
        placeholder="Write a short professional summary..."
        value={resume.summary}
        onChange={handleChange}
      />


      {/* -------------------------------- */}
      {/* EDUCATION */}
      {/* -------------------------------- */}

      <h2>Education</h2>


      <textarea
        name="education"
        placeholder="Degree, college/university, year, CGPA..."
        value={resume.education}
        onChange={handleChange}
        className={
          errors.education
            ? "input-error"
            : ""
        }
      />

      {errors.education && (
        <p className="validation-error">
          {errors.education}
        </p>
      )}


      {/* -------------------------------- */}
      {/* SKILLS */}
      {/* -------------------------------- */}

      <h2>Skills</h2>


      <textarea
        name="skills"
        placeholder="Example: Python, Java, React, SQL, Cybersecurity..."
        value={resume.skills}
        onChange={handleChange}
        className={
          errors.skills
            ? "input-error"
            : ""
        }
      />

      {errors.skills && (
        <p className="validation-error">
          {errors.skills}
        </p>
      )}


      {/* -------------------------------- */}
      {/* PROJECTS */}
      {/* -------------------------------- */}

      <h2>Projects</h2>


      <textarea
        name="projects"
        placeholder="Project name, technologies used, and description..."
        value={resume.projects}
        onChange={handleChange}
        className={
          errors.projects
            ? "input-error"
            : ""
        }
      />

      {errors.projects && (
        <p className="validation-error">
          {errors.projects}
        </p>
      )}


      {/* -------------------------------- */}
      {/* EXPERIENCE */}
      {/* -------------------------------- */}

      <h2>Experience</h2>


      <textarea
        name="experience"
        placeholder="Internships, work experience, responsibilities..."
        value={resume.experience}
        onChange={handleChange}
      />


      {/* -------------------------------- */}
      {/* CERTIFICATIONS */}
      {/* -------------------------------- */}

      <h2>
        Certifications & Achievements
      </h2>


      <textarea
        name="certifications"
        placeholder="Certifications, awards, achievements..."
        value={resume.certifications}
        onChange={handleChange}
        className={
          errors.certifications
            ? "input-error"
            : ""
        }
      />

      {errors.certifications && (
        <p className="validation-error">
          {errors.certifications}
        </p>
      )}


      {/* -------------------------------- */}
      {/* VALIDATE */}
      {/* -------------------------------- */}

      <button type="submit">
        Validate Resume
      </button>

    </form>
  );
}


export default ResumeForm;