import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./lib/protectedRoute";
import CreateTodo from "./pages/createTodo";
import TodoDetail from "./lib/TodoDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/createtodo" element={<ProtectedRoute><CreateTodo /></ProtectedRoute>} />
        <Route path="/todo/:todoId" element={<ProtectedRoute><TodoDetail /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
