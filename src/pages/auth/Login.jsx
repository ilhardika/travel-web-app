import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useForm } from "../../hooks/useForm";
import { loginValidator } from "../../utils/formValidators";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form Hook
  const {
    formState,
    errors,
    isLoading,
    isFormValid,
    handleInputChange,
    handleSubmit,
  } = useForm(
    { email: "", password: "" }, // Initial State
    loginValidator, // Validator
    async (formData) => {
      await login(formData.email, formData.password);
      navigate("/"); // Tambahkan navigate di sini
    }
  );

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">TravApp</h2>
          <p className="text-blue-100 mt-2">Mulai Petualangan Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Email"
            icon={<Mail className="text-gray-400" />}
            error={errors.email}
          />

          <Input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Password"
            icon={<Lock className="text-gray-400" />}
            error={errors.password}
          />

          {errors.submit && (
            <div className="text-red-500 text-center">{errors.submit}</div>
          )}

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
