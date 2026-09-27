import re
from pathlib import Path

from pypdf import PdfReader
from docx import Document

SECTION_ALIASES = {
    "summary": [
        "summary",
        "professional summary",
        "profile",
        "career objective",
        "objective",
        "about me",
    ],
    "education": [
        "education",
        "academic background",
        "educational qualification",
        "academic qualifications",
    ],
    "skills": [
        "skills",
        "technical skills",
        "technical skills & tools",
        "skills & technologies",
        "technical competencies",
    ],
    "projects": [
        "projects",
        "academic projects",
        "personal projects",
        "projects undertaken",
    ],
    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "work history",
        "employment history",
        "professional history",
        "career history",
        "employment",
        "internship",
        "internships",
    ],
    "certifications": [
        "certifications",
        "certificates",
        "certifications & achievements",
        "achievements",
        "certifications and achievements",
    ],
}


# --------------------------------------------------
# FILE TEXT EXTRACTION
# --------------------------------------------------


def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)

    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    return "\n".join(text)


def extract_text_from_docx(file_path):
    document = Document(file_path)

    paragraphs = []

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()

        if text:
            paragraphs.append(text)

    return "\n".join(paragraphs)


def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
        return file.read()


def extract_text(file_path):
    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)

    if extension == ".docx":
        return extract_text_from_docx(file_path)

    if extension == ".txt":
        return extract_text_from_txt(file_path)

    raise ValueError("Unsupported file format. Please upload PDF, DOCX or TXT.")


# --------------------------------------------------
# TEXT CLEANING
# --------------------------------------------------


def normalize_line(line):
    line = line.strip()

    # Remove markdown heading symbols
    line = re.sub(r"^#+\s*", "", line)

    # Remove bullets
    line = re.sub(r"^[\s•\-–—:]+", "", line)

    return line.strip()


# --------------------------------------------------
# SECTION DETECTION
# --------------------------------------------------


def find_section(line):
    normalized = normalize_line(line).lower()

    normalized = re.sub(r"[:\-]+$", "", normalized).strip()

    for section, aliases in SECTION_ALIASES.items():

        for alias in aliases:

            if normalized == alias.lower():
                return section

    return None


# --------------------------------------------------
# CONTACT INFORMATION
# --------------------------------------------------


def extract_contact_information(text):

    email_match = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text)

    phone_match = re.search(r"(?<!\d)(?:\+91[\s-]?)?[6-9]\d{9}(?!\d)", text)

    email = email_match.group(0) if email_match else ""

    phone = ""

    if phone_match:

        phone = re.sub(r"\D", "", phone_match.group(0))

        if phone.startswith("91") and len(phone) == 12:
            phone = phone[-10:]

    return email, phone


# --------------------------------------------------
# NAME
# --------------------------------------------------


def extract_name(text):

    lines = [normalize_line(line) for line in text.splitlines() if normalize_line(line)]

    for line in lines[:8]:

        lower_line = line.lower()

        if "@" in line:
            continue

        if re.search(r"\d", line):
            continue

        if len(line.split()) < 2:
            continue

        if len(line) > 60:
            continue

        excluded_words = [
            "resume",
            "curriculum vitae",
            "cv",
            "profile",
            "objective",
        ]

        if any(word in lower_line for word in excluded_words):
            continue

        return line

    return ""


# --------------------------------------------------
# PROJECT DETECTION
# --------------------------------------------------


def looks_like_project_title(line):

    text = normalize_line(line)

    lower = text.lower()

    # Definitely not a project
    if not text:
        return False

    if "certificate" in lower:
        return False

    if "certification" in lower:
        return False

    if "hackathon" in lower:
        return False

    # Common project indicators
    project_keywords = [
        "system",
        "application",
        "app",
        "platform",
        "website",
        "dashboard",
        "detector",
        "detection",
        "monitoring",
        "management",
        "assistant",
        "analyzer",
        "analysis",
        "portal",
        "tool",
    ]

    if any(keyword in lower for keyword in project_keywords):
        return True

    return False


def looks_like_project_description(line):

    lower = line.lower()

    description_keywords = [
        "developed",
        "built",
        "created",
        "designed",
        "implemented",
        "integrated",
        "extracted",
        "trained",
        "deployed",
        "using",
        "based",
        "real-time",
        "real time",
        "technologies:",
    ]

    return any(keyword in lower for keyword in description_keywords)


# --------------------------------------------------
# EXTRACT SECTIONS
# --------------------------------------------------


def extract_sections(text):

    raw_lines = text.splitlines()

    lines = []

    for line in raw_lines:

        cleaned = normalize_line(line)

        if cleaned:
            lines.append(cleaned)

    sections = {
        "summary": [],
        "education": [],
        "skills": [],
        "projects": [],
        "experience": [],
        "certifications": [],
    }

    current_section = None

    certification_content_started = False

    for index, line in enumerate(lines):

        detected_section = find_section(line)

        # ------------------------------------------
        # NORMAL SECTION HEADING
        # ------------------------------------------

        if detected_section:

            current_section = detected_section

            if detected_section == "certifications":
                certification_content_started = False

            continue

        # ------------------------------------------
        # PROJECT DETECTION INSIDE CERTIFICATIONS
        # ------------------------------------------

        if current_section == "certifications":

            # Detect a project title appearing after
            # certification information.
            if certification_content_started and looks_like_project_title(line):

                current_section = "projects"

                sections["projects"].append(line)

                continue

            # Once actual certification content appears,
            # mark it as started.
            if line:

                lower = line.lower()

                if (
                    "certificate" in lower
                    or "certification" in lower
                    or "hackathon" in lower
                ):
                    certification_content_started = True

        # ------------------------------------------
        # ADD CONTENT TO CURRENT SECTION
        # ------------------------------------------

        if current_section:

            sections[current_section].append(line)

    # ----------------------------------------------
    # CLEAN CERTIFICATION CONTENT
    # ----------------------------------------------

    for section in sections:

        sections[section] = "\n".join(sections[section]).strip()

    return sections


# --------------------------------------------------
# RESUME PARSER
# --------------------------------------------------


def parse_resume(file_path):

    text = extract_text(file_path)

    if not text.strip():

        raise ValueError("No readable text was found in the uploaded resume.")

    email, phone = extract_contact_information(text)

    name = extract_name(text)

    sections = extract_sections(text)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "location": "",
        "summary": sections["summary"],
        "education": sections["education"],
        "skills": sections["skills"],
        "projects": sections["projects"],
        "experience": sections["experience"],
        "certifications": sections["certifications"],
    }
