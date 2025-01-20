import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { registerValidator } from "../../utils/formValidators";

const Register = () => {
  // Hooks
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form Hook
  const {
    formState,
    errors,
    isLoading,
    isFormValid,
    handleInputChange,
    handleSubmit,
  } = useForm(
    // Initial State
    {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "user",
    },
    // Validator
    registerValidator,
    // Submit Handler
    async (formData) => {
      await register(formData);
    },
    // Navigate path setelah berhasil
    "/login"
  );

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">TravApp</h2>
          <p className="text-blue-100 mt-2">Buat Akun Baru</p>
        </div>

        {/* Form Registrasi */}
        <form
          onSubmit={(e) => handleSubmit(e, navigate)}
          className="p-6 space-y-6"
        >
          <Input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Nama Lengkap"
            icon={<User className="text-gray-400" />}
            error={errors.name}
          />

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

          <Input
            type="password"
            name="passwordRepeat"
            value={formState.passwordRepeat}
            onChange={handleInputChange}
            placeholder="Konfirmasi Password"
            icon={<Lock className="text-gray-400" />}
            error={errors.passwordRepeat}
          />

          <div>
            <select
              name="role"
              value={formState.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

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
            {isLoading ? "Mendaftar..." : "Daftar"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
