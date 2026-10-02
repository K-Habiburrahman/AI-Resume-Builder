import { useRef, useState } from "react";

import { useResume } from "../services/ResumeContext";

import {
  generateInterviewQuestions,
  importResume,
} from "../services/api";

function MockInterview() {
  const { resume, savedResumes } = useResume();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  // Resume selected specifically for this interview
  const [selectedResume, setSelectedResume] = useState(null);
  const resumeFileInput = useRef(null);

  /*
   * If there are 2 or more saved resumes, user must
   * select which resume should be used for the interview.
   *
   * Otherwise use the current resume directly.
   */
  const hasMultipleResumes = savedResumes.length >= 2;

  const interviewResume =
    selectedResume || resume;

  const canStartInterview = [
    "summary",
    "education",
    "skills",
    "projects",
    "experience",
    "certifications",
  ].some((field) => interviewResume[field]?.trim());

  const selectResume = (resumeData) => {
    setSelectedResume(resumeData);
    setError("");
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const result = await importResume(file);
      if (!result.success) {
        setError(result.message || "Could not import the resume.");
        return;
      }

      setSelectedResume(result.resume);
    } catch (error) {
      setError(error.message || "Could not import the resume.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const startInterview = async () => {
    if (!interviewResume) {
      setError("Please select a resume before starting the interview.");
      return;
    }

    if (!canStartInterview) {
      setError(
        "Please complete the Skills and Certifications sections in the selected resume before starting the interview."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await generateInterviewQuestions(
        interviewResume
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setQuestions(result.questions);
      setCurrentQuestion(0);
      setAnswers([]);
      setAnswer("");
      setStarted(true);
      setFinished(false);
    } catch (error) {
      setError(
        error.message ||
          "Could not generate interview questions. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const resumeUploadControl = (
    <>
      <input
        ref={resumeFileInput}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleResumeUpload}
        hidden
      />
      <button
        type="button"
        onClick={() => resumeFileInput.current?.click()}
        disabled={uploading || loading}
      >
        {uploading ? "Importing Resume..." : "Upload Resume"}
      </button>
    </>
  );

  const submitAnswer = () => {
    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestion],
        answer: answer.trim(),
      },
    ];

    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const restartInterview = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setAnswer("");
    setStarted(false);
    setFinished(false);
    setSelectedResume(null);
    setError("");
  };

  // --------------------------------------------------
  // Resume Selection Screen
  // --------------------------------------------------

  if (!started && hasMultipleResumes && !selectedResume) {
    return (
      <div className="mock-interview">
        <h1>Select Resume</h1>

        <p>
          You have multiple saved resumes. Select the resume
          you want to use, or upload another resume.
        </p>

        {resumeUploadControl}

        <div className="interview-results">
          {savedResumes.map((item) => (
            <div
              className="interview-result"
              key={item.id}
            >
              <h3>
                {item.name?.trim()
                  ? item.name
                  : "Untitled Resume"}
              </h3>

              <p>
                {item.email || "No email provided"}
              </p>

              <p>
                {item.skills?.trim()
                  ? item.skills
                  : "No skills added"}
              </p>

              <button
                onClick={() => selectResume(item)}
              >
                Use This Resume
              </button>
            </div>
          ))}
        </div>

        {error && (
          <p className="interview-error">
            {error}
          </p>
        )}
      </div>
    );
  }

  // --------------------------------------------------
  // Start Screen
  // --------------------------------------------------

  if (!started) {
    return (
      <div className="mock-interview">
        <h1>Mock Interview</h1>

        <p>
          Upload a resume or use your current or saved resume. Gemini will
          generate 10 questions based on its content.
        </p>

        {resumeUploadControl}

        {selectedResume && (
          <div className="interview-requirements">
            <h3>Selected Resume</h3>

            <p>
              <strong>
                {selectedResume.name?.trim()
                  ? selectedResume.name
                  : "Untitled Resume"}
              </strong>
            </p>

            {selectedResume.email && (
              <p>{selectedResume.email}</p>
            )}
          </div>
        )}

        <div className="interview-requirements">
          <h3>Resume details</h3>
          <p>
            Include skills, projects, education, experience, or certifications
            so the questions can be tailored to your resume.
          </p>
        </div>

        {!canStartInterview && (
          <p className="interview-warning">
            Please complete the Skills and Certifications
            sections before starting the interview.
          </p>
        )}

        {error && (
          <p className="interview-error">
            {error}
          </p>
        )}

        <button
          onClick={startInterview}
          disabled={loading || uploading || !canStartInterview}
        >
          {loading
            ? "Generating Questions..."
            : "Start Interview"}
        </button>
      </div>
    );
  }

  // --------------------------------------------------
  // Completed Screen
  // --------------------------------------------------

  if (finished) {
    return (
      <div className="mock-interview">
        <h1>Interview Completed</h1>

        <p>
          You answered all 10 questions.
        </p>

        {interviewResume && (
          <p>
            Resume:{" "}
            <strong>
              {interviewResume.name?.trim()
                ? interviewResume.name
                : "Untitled Resume"}
            </strong>
          </p>
        )}

        <h2>Interview Answers</h2>

        <div className="interview-results">
          {answers.map((item, index) => (
            <div
              className="interview-result"
              key={index}
            >
              <h3>
                Question {index + 1}
              </h3>

              <p>
                <strong>
                  {item.question}
                </strong>
              </p>

              <p>
                {item.answer ||
                  "No answer provided."}
              </p>
            </div>
          ))}
        </div>

        <button onClick={restartInterview}>
          Start New Interview
        </button>
      </div>
    );
  }

  // --------------------------------------------------
  // Interview Screen
  // --------------------------------------------------

  return (
    <div className="mock-interview">
      <h1>Mock Interview</h1>

      {interviewResume && (
        <p>
          Resume:{" "}
          <strong>
            {interviewResume.name?.trim()
              ? interviewResume.name
              : "Untitled Resume"}
          </strong>
        </p>
      )}

      <div className="interview-progress">
        Question {currentQuestion + 1} of{" "}
        {questions.length}
      </div>

      <div className="question-card">
        <h2>
          Question {currentQuestion + 1}
        </h2>

        <p>
          {questions[currentQuestion]}
        </p>
      </div>

      <textarea
        value={answer}
        onChange={(event) =>
          setAnswer(event.target.value)
        }
        placeholder="Type your answer..."
      />

      <button onClick={submitAnswer}>
        {currentQuestion === questions.length - 1
          ? "Finish Interview"
          : "Submit Answer"}
      </button>
    </div>
  );
}

export default MockInterview;
