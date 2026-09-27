import os
import random
import re
import tempfile

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from resume_parser import parse_resume


app = FastAPI(
    title="AI Resume Builder & Mock Interviewer",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "AI Resume Builder backend is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# RESUME IMPORT
# --------------------------------------------------

@app.post("/api/resume/import")
async def import_resume(file: UploadFile = File(...)):

    allowed_extensions = [
        ".pdf",
        ".docx",
        ".txt"
    ]

    filename = file.filename or ""

    extension = os.path.splitext(filename)[1].lower()

    if extension not in allowed_extensions:
        return {
            "success": False,
            "message": (
                "Unsupported file format. "
                "Please upload PDF, DOCX or TXT."
            ),
            "resume": None
        }

    temp_path = None

    try:
        file_content = await file.read()

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension
        ) as temp_file:

            temp_file.write(file_content)
            temp_path = temp_file.name

        resume = parse_resume(temp_path)

        return {
            "success": True,
            "message": "Resume imported successfully.",
            "resume": resume
        }

    except Exception as error:

        return {
            "success": False,
            "message": f"Could not read the resume: {str(error)}",
            "resume": None
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


# --------------------------------------------------
# MOCK INTERVIEW
# --------------------------------------------------

class InterviewRequest(BaseModel):
    resume: dict


def extract_skills(resume):

    skills = resume.get("skills", "")

    if not skills:
        return []

    skill_list = re.split(
        r",|\n|\|",
        skills
    )

    return [
        skill.strip()
        for skill in skill_list
        if skill.strip()
    ]


def extract_projects(resume):

    projects = resume.get("projects", "")

    if not projects:
        return []

    project_lines = [
        line.strip()
        for line in projects.split("\n")
        if line.strip()
    ]

    return project_lines


def generate_questions(resume):

    skills = extract_skills(resume)
    projects = extract_projects(resume)

    education = resume.get(
        "education",
        ""
    ).strip()

    experience = resume.get(
        "experience",
        ""
    ).strip()

    certifications = resume.get(
        "certifications",
        ""
    ).strip()

    questions = []

    # -----------------------------
    # SKILL QUESTIONS
    # -----------------------------

    for skill in skills:

        questions.append(
            f"How have you used {skill} in your projects?"
        )

        questions.append(
            f"What challenges did you face while working with {skill}?"
        )

        questions.append(
            f"Explain an important concept of {skill} that you have applied."
        )

    # -----------------------------
    # PROJECT QUESTIONS
    # -----------------------------

    for project in projects:

        project_name = project[:100].strip()

        questions.append(
            f"Can you explain how {project_name} works?"
        )

        questions.append(
            f"What technologies did you use while developing {project_name}?"
        )

        questions.append(
            f"What was the main challenge you faced while developing {project_name}?"
        )

        questions.append(
            f"How would you improve {project_name} in the future?"
        )

    # -----------------------------
    # SKILL + PROJECT QUESTIONS
    # -----------------------------

    for skill in skills[:3]:

        for project in projects[:2]:

            project_name = project[:100].strip()

            questions.append(
                f"How did you apply {skill} while developing {project_name}?"
            )

    # -----------------------------
    # EDUCATION
    # -----------------------------

    if education:

        education_text = education[:120]

        questions.append(
            f"What technical concepts have you learned during {education_text}?"
        )

        questions.append(
            f"How have your studies in {education_text} helped you develop your technical skills?"
        )

    # -----------------------------
    # EXPERIENCE
    # -----------------------------

    if experience:

        experience_text = experience[:120]

        questions.append(
            f"What responsibilities did you handle during {experience_text}?"
        )

        questions.append(
            f"What technical skills did you apply during {experience_text}?"
        )

        questions.append(
            f"What was the most challenging part of {experience_text}?"
        )

    # -----------------------------
    # CERTIFICATIONS
    # -----------------------------

    if certifications:

        certification_text = certifications[:120]

        questions.append(
            f"What practical knowledge did you gain from {certification_text}?"
        )

        questions.append(
            f"How have you applied the knowledge gained from {certification_text}?"
        )

    # -----------------------------
    # REMOVE DUPLICATES
    # -----------------------------

    unique_questions = []

    for question in questions:

        question = question.strip()

        if (
            question
            and question not in unique_questions
        ):
            unique_questions.append(question)

    random.shuffle(unique_questions)

    return unique_questions[:10]


@app.post("/api/interview/questions")
def interview_questions(
    request: InterviewRequest
):

    resume = request.resume

    skills = resume.get(
        "skills",
        ""
    ).strip()

    certifications = resume.get(
        "certifications",
        ""
    ).strip()

    if not skills or not certifications:

        return {
            "success": False,
            "message": (
                "Please complete the Skills and "
                "Certifications sections before "
                "starting the interview."
            ),
            "questions": [],
            "count": 0
        }

    questions = generate_questions(resume)

    if len(questions) < 10:

        return {
            "success": False,
            "message": (
                "Please add more information to your "
                "resume, such as projects, skills, "
                "education, experience or certifications."
            ),
            "questions": [],
            "count": 0
        }

    return {
        "success": True,
        "questions": questions,
        "count": 10
    }