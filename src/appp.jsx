import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Instructions from "./Pages/Instructions";
import QuestionHub from "./Pages/QuestionHub";
import CodeEditor from "./Pages/CodeEditor";
import Leaderboard from "./Pages/Leaderboard";
import Results from "./Pages/Results";
import { toast, ToastContainer } from "react-toastify";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import PublicRoutes from "./ProtectedRoutes/PublicRoutes";


function App() {

  const location = useLocation();

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable

      />

      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          {/* <Route path="/instructions" element={<Instructions />} />
          <Route path="/questionhub" element={<QuestionHub />} />
          <Route path="/codeeditor" element={<CodeEditor />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/results" element={<Results />} /> */}

        </Route>


        <Route element={<ProtectedRoutes />}>
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/questionhub" element={<QuestionHub />} />
          <Route path="/codeeditor" element={<CodeEditor />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/results" element={<Results />} />
        </Route>
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
