import { useState } from "react";
import { useResume } from "../services/ResumeContext";
import { generateInterviewQuestions } from "../services/api";

function MockInterview() {
  const { resume } = useResume();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const canStartInterview =
    resume.skills.trim() &&
    resume.certifications.trim();

  const startInterview = async () => {

    if (!canStartInterview) {
      setError(
        "Please complete the Skills and Certifications sections before starting the interview."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {

      const result = await generateInterviewQuestions(resume);

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
        "Could not generate interview questions. Please make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  const submitAnswer = () => {

    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestion],
        answer: answer.trim()
      }
    ];

    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentQuestion === 9) {

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
    setError("");

  };


  // --------------------------------------------------
  // Start Screen
  // --------------------------------------------------

  if (!started) {

    return (
      <div className="mock-interview">

        <h1>Mock Interview</h1>

        <p>
          Practice a technical interview using the information
          provided in your resume.
        </p>

        <p>
          The interview will contain exactly{" "}
          <strong>10 questions</strong>.
        </p>

        <div className="interview-requirements">

          <h3>Before starting</h3>

          <p>
            Complete the following sections:
          </p>

          <ul>
            <li>
              Skills{" "}
              {resume.skills.trim() ? "✓" : "✗"}
            </li>

            <li>
              Certifications{" "}
              {resume.certifications.trim() ? "✓" : "✗"}
            </li>
          </ul>

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
          disabled={loading || !canStartInterview}
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

      <div className="interview-progress">

        Question {currentQuestion + 1} of 10

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

      <button
        onClick={submitAnswer}
      >
        {currentQuestion === 9
          ? "Finish Interview"
          : "Submit Answer"}
      </button>

    </div>
  );
}

export default MockInterview;