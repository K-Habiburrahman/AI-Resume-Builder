const API_BASE_URL = "http://127.0.0.1:8000";

export async function checkBackend() {
  const response = await fetch(
    `${API_BASE_URL}/api/health`
  );

  if (!response.ok) {
    throw new Error("Backend connection failed");
  }

  return response.json();
}


export async function importResume(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/resume/import`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to import resume");
  }

  return response.json();
}


export async function generateInterviewQuestions(resume) {
  const response = await fetch(
    `${API_BASE_URL}/api/interview/questions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to generate interview questions"
    );
  }

  return response.json();
}