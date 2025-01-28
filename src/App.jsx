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
import CartPage from "./pages/CartPage";
import TransactionsPage from "./pages/TransactionsPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route
                path="/activity/detail/:activityId"
                element={<ActivityDetailPage />}
              />
              <Route path="/activity" element={<DestinationsPage />}></Route>
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
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SinginPage />}></Route>
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions/:transactionId"
                element={
                  <ProtectedRoute>
                    <TransactionDetailPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
