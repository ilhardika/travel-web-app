import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import SinginPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import DestinationsPage from "./pages/ActivityPage";
import PromoPage from "./pages/PromoPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <DestinationsPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/activity/:categoryName"
            element={<DestinationsPage />}
          ></Route>
          <Route path="/promo" element={<PromoPage />}></Route>
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
          <Route
            path="/activity/:activityId"
            element={<ActivityDetailPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
