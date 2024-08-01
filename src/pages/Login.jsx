import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react"; // Import Lucide Spinner
import newRequest from "../UserRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await newRequest.post("/users/login", {
        email,
        password,
      });
      sessionStorage.setItem("userGln", JSON.stringify(response.data));
      navigate("/select-gln");
      toast.success(response?.data?.message || "Login Successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h2 className="text-blue-600 text-2xl font-bold mb-6 text-center">
          G-Route Admin Login
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-6 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader className="animate-spin text-white" size={24} />
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>Login</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
