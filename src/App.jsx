import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import SinginPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import DestinationsPage from "./pages/DestinationsPage";
import PromoPage from "./pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/destinations"
            element={
              <ProtectedRoute>
                <DestinationsPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/destinations/:categoryName"
            element={<DestinationsPage />}
          ></Route>
          <Route
            path="/promo"
            element={
              <ProtectedRoute>
                <PromoPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <UpdateProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signin" element={<SinginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
