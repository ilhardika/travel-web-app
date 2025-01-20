import Navbar from "../../components/Navbar";
import { FcGoogle } from "react-icons/fc";

export default function Signin() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-grow p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Signin
          </h1>
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                required
                className="w-full h-12 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <input
                type="password"
                required
                className="w-full h-12 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full h-12 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Sign In
            </button>
            <div className="flex items-center justify-between">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button className="flex items-center justify-center w-full h-12 border border-gray-300 rounded hover:bg-gray-100 transition duration-200">
              <FcGoogle className="mr-2 text-2xl" />
              Sign in with Google
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
