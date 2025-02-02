import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
// user pages
import LandingPage from "./pages/user/LandingPage";
import SinginPage from "./pages/user/SigninPage";
import SignupPage from "./pages/user/SignupPage";
import ProfilePage from "./pages/user/ProfilePage";
import UpdateProfilePage from "./pages/user/UpdateProfilePage";
import DestinationsPage from "./pages/user/ActivityPage";
import PromoPage from "./pages/user/PromoPage";
import ActivityDetailPage from "./pages/user/ActivityDetailPage";
import CartPage from "./pages/user/CartPage";
import TransactionsPage from "./pages/user/TransactionsPage";
import TransactionDetailPage from "./pages/user/TransactionDetailPage";
import PaymentsPage from "./pages/user/PaymentsPage";
// admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ActivityManagement from "./pages/admin/ActivityManagement";
import ActivityDetailManagement from "./pages/admin/ActivityDetailManagement";
import PromoManagement from "./pages/admin/PromoManagement";
import PromoDetailManagement from "./pages/admin/PromoDetailManagement";
import BannerManagement from "./pages/admin/BannerManagement";
import TransactionManagement from "./pages/admin/TransactionManagement";
import TransactionDetail from "./pages/admin/TransactionDetail";

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
              <Route
                path="/payments/:transactionId"
                element={
                  <ProtectedRoute>
                    <PaymentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-management"
                element={
                  <ProtectedRoute adminOnly>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category-management"
                element={
                  <ProtectedRoute adminOnly>
                    <CategoryManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity-management"
                element={
                  <ProtectedRoute adminOnly>
                    <ActivityManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity-management/:activityId"
                element={
                  <ProtectedRoute adminOnly>
                    <ActivityDetailManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promo-management"
                element={
                  <ProtectedRoute adminOnly>
                    <PromoManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promo-management/:promoId"
                element={
                  <ProtectedRoute adminOnly>
                    <PromoDetailManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/banner-management"
                element={
                  <ProtectedRoute adminOnly>
                    <BannerManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaction-management"
                element={
                  <ProtectedRoute adminOnly>
                    <TransactionManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaction-management/:transactionId"
                element={
                  <ProtectedRoute adminOnly>
                    <TransactionDetail />
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
