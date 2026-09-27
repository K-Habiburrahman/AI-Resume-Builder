import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumePreview from "./pages/ResumePreview";
import Templates from "./pages/Templates";
import MockInterview from "./pages/MockInterview";

import { ResumeProvider } from "./services/ResumeContext";

function App() {
  return (
    <BrowserRouter>

      <ResumeProvider>

        <div className="app">

          <Sidebar />

          <div className="main">

            <Navbar />

            <main className="content">

              <Routes>

                <Route
                  path="/"
                  element={<Dashboard />}
                />

                <Route
                  path="/resume"
                  element={<ResumeBuilder />}
                />

                <Route
                  path="/preview"
                  element={<ResumePreview />}
                />

                <Route
                  path="/templates"
                  element={<Templates />}
                />

                <Route
                  path="/interview"
                  element={<MockInterview />}
                />

              </Routes>

            </main>

          </div>

        </div>

      </ResumeProvider>

    </BrowserRouter>
  );
}

export default App;