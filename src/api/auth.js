import axios from "axios";

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    apiKey: API_KEY,
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor untuk token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (userData) => axiosInstance.post("/register", userData),
  login: (credentials) => axiosInstance.post("/login", credentials),
  logout: () => axiosInstance.get("/logout"),
};

// src/api/user.js
export const userApi = {
  getLoggedUser: () => axiosInstance.get("/user"),
  getAllUsers: () => axiosInstance.get("/all-user"),
  updateProfile: (profileData) =>
    axiosInstance.post("/update-profile", profileData),
  updateUserRole: (userId, roleData) =>
    axiosInstance.post(`/update-user-role/${userId}`, roleData),
};

// src/api/banner.js
export const bannerApi = {
  createBanner: (bannerData) =>
    axiosInstance.post("/create-banner", bannerData),
  updateBanner: (bannerId, bannerData) =>
    axiosInstance.post(`/update-banner/${bannerId}`, bannerData),
  deleteBanner: (bannerId) =>
    axiosInstance.delete(`/delete-banner/${bannerId}`),
  getBanners: () => axiosInstance.get("/banners"),
  getBannerById: (bannerId) => axiosInstance.get(`/banner/${bannerId}`),
};

// src/api/promo.js
export const promoApi = {
  createPromo: (promoData) => axiosInstance.post("/create-promo", promoData),
  updatePromo: (promoId, promoData) =>
    axiosInstance.post(`/update-promo/${promoId}`, promoData),
  deletePromo: (promoId) => axiosInstance.delete(`/delete-promo/${promoId}`),
  getPromos: () => axiosInstance.get("/promos"),
  getPromoById: (promoId) => axiosInstance.get(`/promo/${promoId}`),
};

// src/api/category.js
export const categoryApi = {
  createCategory: (categoryData) =>
    axiosInstance.post("/create-category", categoryData),
  updateCategory: (categoryId, categoryData) =>
    axiosInstance.post(`/update-category/${categoryId}`, categoryData),
  deleteCategory: (categoryId) =>
    axiosInstance.delete(`/delete-category/${categoryId}`),
  getCategories: () => axiosInstance.get("/categories"),
  getCategoryById: (categoryId) => axiosInstance.get(`/category/${categoryId}`),
};

// src/api/activity.js
export const activityApi = {
  createActivity: (activityData) =>
    axiosInstance.post("/create-activity", activityData),
  updateActivity: (activityId, activityData) =>
    axiosInstance.post(`/update-activity/${activityId}`, activityData),
  deleteActivity: (activityId) =>
    axiosInstance.delete(`/delete-activity/${activityId}`),
  getActivities: () => axiosInstance.get("/activities"),
  getActivityById: (activityId) => axiosInstance.get(`/activity/${activityId}`),
  getActivitiesByCategoryId: (categoryId) =>
    axiosInstance.get(`/activities-by-category/${categoryId}`),
};

// src/api/payment.js
export const paymentApi = {
  getPaymentMethods: () => axiosInstance.get("/payment-methods"),
  generatePaymentMethods: () => axiosInstance.post("/generate-payment-methods"),
};

// src/api/cart.js
export const cartApi = {
  addToCart: (cartData) => axiosInstance.post("/add-cart", cartData),
  updateCart: (cartId, updateData) =>
    axiosInstance.post(`/update-cart/${cartId}`, updateData),
  deleteCart: (cartId) => axiosInstance.delete(`/delete-cart/${cartId}`),
  getCarts: () => axiosInstance.get("/carts"),
};

// src/api/transaction.js
export const transactionApi = {
  getTransactionById: (transactionId) =>
    axiosInstance.get(`/transaction/${transactionId}`),
  getMyTransactions: () => axiosInstance.get("/my-transactions"),
  getAllTransactions: () => axiosInstance.get("/all-transactions"),
  createTransaction: (transactionData) =>
    axiosInstance.post("/create-transaction", transactionData),
  cancelTransaction: (transactionId) =>
    axiosInstance.post(`/cancel-transaction/${transactionId}`),
  updateTransactionProofPayment: (transactionId, proofData) =>
    axiosInstance.post(
      `/update-transaction-proof-payment/${transactionId}`,
      proofData
    ),
  updateTransactionStatus: (transactionId, statusData) =>
    axiosInstance.post(
      `/update-transaction-status/${transactionId}`,
      statusData
    ),
};

// src/api/upload.js
export const uploadApi = {
  uploadImage: (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    return axiosInstance.post("/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
