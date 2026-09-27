import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ResumeContext = createContext();

const createBlankResume = () => ({
  id: Date.now().toString(),
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  education: "",
  skills: "",
  projects: "",
  experience: "",
  certifications: "",
  template: "blue",
  saved: false,
  updatedAt: "",
});

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("currentResume");

    try {
      return saved
        ? JSON.parse(saved)
        : createBlankResume();
    } catch {
      return createBlankResume();
    }
  });

  const [savedResumes, setSavedResumes] = useState(() => {
    const saved = localStorage.getItem("savedResumes");

    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save current resume to browser storage
  useEffect(() => {
    localStorage.setItem(
      "currentResume",
      JSON.stringify(resume)
    );
  }, [resume]);

  // Save all saved resumes to browser storage
  useEffect(() => {
    localStorage.setItem(
      "savedResumes",
      JSON.stringify(savedResumes)
    );
  }, [savedResumes]);

  // Create a completely new resume
  const createNewResume = () => {
    setResume(createBlankResume());
  };

  // Save current resume
  const saveResume = () => {
    const updatedResume = {
      ...resume,
      saved: true,
      updatedAt: new Date().toISOString(),
    };

    setResume(updatedResume);

    setSavedResumes((previous) => {
      const exists = previous.some(
        (item) => item.id === updatedResume.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === updatedResume.id
            ? updatedResume
            : item
        );
      }

      return [
        updatedResume,
        ...previous,
      ];
    });

    return updatedResume;
  };

  // Open an existing saved resume
  const openResume = (resumeData) => {
    setResume({
      ...resumeData,
      saved: true,
    });
  };

  // Delete saved resume
  const deleteResume = (id) => {
    setSavedResumes((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    if (resume.id === id) {
      createNewResume();
    }
  };

  // Change resume template
  const changeTemplate = (template) => {
    setResume((previous) => ({
      ...previous,
      template,
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        savedResumes,
        createNewResume,
        saveResume,
        openResume,
        deleteResume,
        changeTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}