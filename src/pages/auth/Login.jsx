import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

// Import komponen common
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { useAuth } from "../../context/AuthContext";

// Utility validator
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const Login = () => {
  // State Management
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handler Input dengan useCallback untuk optimasi
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Hapus error saat mengetik
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  // Validasi Form dengan useMemo
  const isFormValid = useMemo(() => {
    return formState.email.length > 0 && formState.password.length >= 6;
  }, [formState]);

  // Handler Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    const newErrors = {};

    if (!formState.email) {
      newErrors.email = "Email harus diisi";
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formState.password) {
      newErrors.password = "Password harus diisi";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    // Set errors jika ada
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await login(formState.email, formState.password);
      navigate("/");
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Login gagal",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render Method
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header dengan Ilustrasi */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">TravApp</h2>
          <p className="text-blue-100 mt-2">Mulai Petualangan Anda</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Input Email */}
          <div className="relative">
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="Email"
              icon={<Mail className="text-gray-400" />}
              error={errors.email}
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              placeholder="Password"
              icon={<Lock className="text-gray-400" />}
              error={errors.password}
            />
          </div>

          {/* Error Submit */}
          {errors.submit && (
            <div className="text-red-500 text-center">{errors.submit}</div>
          )}

          {/* Tombol Login */}
          <Button
            type="submit"
            disabled={isLoading || !isFormValid}
            className={`w-full ${
              isLoading || !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Memproses..." : "Login"}
          </Button>

          {/* Link Registrasi */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Daftar Sekarang
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
