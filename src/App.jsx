import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Instructions from "./Pages/Instructions";
import QuestionHub from "./Pages/QuestionHub";
import CodeEditor from "./pages/CodeEditor";
import Leaderboard from "./Pages/Leaderboard";
import Results from "./Pages/Results";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/question-hub" element={<QuestionHub />} />
        <Route path="/codeeditor" element={<CodeEditor />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      {/* <Login /> */}
      {/* <Instructions /> */}
      {/* <QuestionHub /> */}
      {/* <CodeEditor /> */}
      {/* <Leaderboard /> */}
      {/* <Results /> */}
    </div>
  );
}

export default App;
