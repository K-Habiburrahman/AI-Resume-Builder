# AI Resume Builder & Mock Interviewer

An AI-powered web application that helps students and job seekers **create professional resumes** and **practice interviews** through an interactive mock-interview system.

The project combines **React** for the frontend and **Python** for the backend, with AI concepts integrated to provide intelligent resume assistance and interview practice.

---

## 🚀 Features

### 📄 AI Resume Builder

* Create a professional resume using a structured form.
* Add personal information, education, skills, projects, experience, certifications, and achievements.
* Generate a clean and professional resume layout.
* Preview the resume before downloading.
* Download the generated resume for further use.

### 🎤 Mock Interviewer

* Conduct an interactive mock interview.
* Generate interview questions based on the user's profile, skills, and selected role.
* Accept answers from the user.
* Provide feedback on the answers.
* Help users identify areas for improvement.
* Simulate a basic technical/job interview environment.

### 🧠 AI-Based Assistance

* Intelligent question generation.
* Resume content suggestions.
* Basic answer evaluation.
* Role-specific interview preparation.
* Personalized feedback based on user responses.

---

## 🛠️ Technology Stack

### Frontend

* **React.js**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Vite**

### Backend

* **Python**
* **FastAPI**

### AI / Machine Learning

* Natural Language Processing (NLP)
* Prompt-based AI interaction
* Text analysis
* Question generation
* Answer evaluation

### Development Tools

* Git
* GitHub
* Visual Studio Code

---

## 📂 Project Structure

```text
AI-Assistant/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

> The exact structure may change as the project develops.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd AI-Assistant
```

---

## 🖥️ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🐍 Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Add your Gemini API key to `backend/.env` before starting FastAPI. The
interview uses `gemini-3.5-flash`; change `GEMINI_MODEL` there if your API key
uses a different model. Keep `.env` private and do not add its key to frontend
files.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation can be accessed at:

```text
http://127.0.0.1:8000/docs
```

---

## 🔄 Application Workflow

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                ┌────────────▼────────────┐
                │     React Frontend      │
                └────────────┬────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
       ┌──────▼──────┐              ┌───────▼───────┐
       │ Resume      │              │ Mock Interview│
       │ Builder     │              │     Module    │
       └──────┬──────┘              └───────┬───────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼────────┐
                    │ Python Backend  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   AI / NLP      │
                    │    Services     │
                    └─────────────────┘
```

---

## 🎓 AI Syllabus Concepts Used

The project is designed to demonstrate concepts from the **Artificial Intelligence syllabus** through practical implementation.

| AI Concept                   | Application in Project                                         |
| ---------------------------- | -------------------------------------------------------------- |
| Artificial Intelligence      | Intelligent resume and interview assistance                    |
| Natural Language Processing  | Processing resume and interview text                           |
| Knowledge Representation     | Representing candidate information and job-related information |
| Search / Question Generation | Generating suitable interview questions                        |
| Reasoning                    | Evaluating responses against expected concepts                 |
| Machine Learning             | Potential text/answer classification and evaluation            |
| Intelligent Agents           | Mock interviewer acts as an interactive agent                  |
| Human-AI Interaction         | User interacts with the AI system through the web interface    |

---

## 🎯 Objectives

1. Develop an easy-to-use AI-assisted resume creation platform.
2. Help students create structured and professional resumes.
3. Provide an interactive mock interview environment.
4. Generate role-specific interview questions.
5. Provide useful feedback on interview answers.
6. Demonstrate practical implementation of Artificial Intelligence concepts.
7. Develop the project using technologies that provide practical understanding of modern web application development.

---

## 👥 Target Users

* College students
* Fresh graduates
* Job seekers
* Internship applicants
* Students preparing for technical interviews

---

## 🔮 Future Scope

The application can be extended with:

* Multiple professional resume templates.
* PDF resume generation.
* Resume quality scoring.
* ATS compatibility analysis.
* Job-description-based resume customization.
* Voice-based mock interviews.
* Speech-to-text processing.
* Facial-expression analysis where appropriate and privacy-preserving.
* Advanced NLP-based answer evaluation.
* Job-specific interview preparation.
* User accounts and resume history.
* Resume sharing through a public link.
* Multilingual resume and interview support.

---

## 🔐 Privacy

The application should follow responsible handling of user-provided information.

Users should avoid entering unnecessary sensitive information. Any future cloud-based AI integration should use appropriate authentication, access control, and data-protection practices.

---

## 📌 Project Status

**Development**

The project is currently under development. Features and architecture may change as new AI and web-development concepts are implemented.

---

## 📜 License

This project is developed as an academic mini-project.

---

## 👨‍💻 Developers

**Computer Engineering Students**

Developed as part of an academic mini-project in Artificial Intelligence.
