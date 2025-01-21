import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./lib/ProtectedRoutes";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
